import hmac
import logging
import re

from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import SimpleRateThrottle

from .models import ChatMessage
from .openai_client import ChatUnavailable, generate_reply
from .serializers import ChatMessageSerializer

logger = logging.getLogger(__name__)

MAX_MESSAGE_LENGTH = 1000
SESSION_RE = re.compile(r"^[A-Za-z0-9_\-]{1,128}$")

# Safe, visitor-facing text for each failure reason (never leak internals).
FRIENDLY = {
    "busy": "MilleBot is very busy right now. Please try again in a minute.",
    "network": "MilleBot couldn't reach its AI service. Please try again shortly.",
    "not_configured": "MilleBot isn't fully set up yet. Please contact the team on WhatsApp.",
    "auth": "MilleBot isn't fully set up yet. Please contact the team on WhatsApp.",
    "empty": "MilleBot didn't have an answer that time. Please rephrase and try again.",
    "provider": "MilleBot is having a technical problem. Please try again shortly.",
}


class ChatThrottle(SimpleRateThrottle):
    """Per-IP limit so one visitor can't burn the whole AI quota."""

    scope = "chat"

    def get_cache_key(self, request, view):
        return self.cache_format % {"scope": self.scope, "ident": self.get_ident(request)}


def _history_for(session_id: str) -> list[dict]:
    history: list[dict] = []
    if session_id:
        recent = ChatMessage.objects.filter(session_id=session_id).order_by("-timestamp")[:8]
        for row in reversed(list(recent)):
            history.append({"role": "user", "content": row.message})
            history.append({"role": "assistant", "content": row.response})
    return history


def _answer(session_id: str, message: str) -> ChatMessage:
    """Generate a reply and store the exchange. Raises ChatUnavailable on provider trouble."""
    reply = generate_reply(message, history=_history_for(session_id))
    return ChatMessage.objects.create(
        message=message, response=reply, session_id=session_id or None
    )


@api_view(["GET"])
def health(request):
    """Open /api/health/ in a browser to check the backend and the AI key are wired up."""
    return Response({"status": "ok", "ai_configured": bool((settings.GROQ_API_KEY or "").strip())})


@api_view(["POST"])
@throttle_classes([ChatThrottle])
def chat(request):
    message = str(request.data.get("message") or "").strip()
    session_id = str(request.data.get("session_id") or "")
    if not SESSION_RE.match(session_id):
        session_id = ""

    if not message:
        return Response({"error": "Message is required.", "code": "empty"}, status=status.HTTP_400_BAD_REQUEST)
    if len(message) > MAX_MESSAGE_LENGTH:
        return Response(
            {"error": f"Please keep your message under {MAX_MESSAGE_LENGTH} characters.", "code": "too_long"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        chat_msg = _answer(session_id, message)
    except ChatUnavailable as exc:
        logger.warning("Chat unavailable (%s): %s", exc.code, exc)
        return Response(
            {"error": FRIENDLY.get(exc.code, FRIENDLY["provider"]), "code": exc.code},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )
    except Exception:  # noqa: BLE001 — never leak a stack trace to the browser
        logger.exception("Unexpected chat error")
        return Response(
            {"error": FRIENDLY["provider"], "code": "provider"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
    return Response(ChatMessageSerializer(chat_msg).data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def history(request):
    session_id = request.query_params.get("session_id", "")
    if not SESSION_RE.match(session_id):
        # Never return other people's conversations — a valid session id is required.
        return Response([])
    rows = ChatMessage.objects.filter(session_id=session_id).order_by("timestamp")[:50]
    return Response(ChatMessageSerializer(rows, many=True).data)


@api_view(["POST"])
def whatsapp_message(request):
    """
    Webhook used by whatsapp-bot/index.js:  POST {from, message}  ->  {reply}
    Protected by the shared X-Bot-Token header (WHATSAPP_BOT_TOKEN / BOT_TOKEN).
    """
    expected = getattr(settings, "WHATSAPP_BOT_TOKEN", "")
    if expected and not hmac.compare_digest(request.headers.get("X-Bot-Token", ""), expected):
        return Response({"error": "Forbidden."}, status=status.HTTP_403_FORBIDDEN)

    sender = re.sub(r"\D", "", str(request.data.get("from") or ""))[:32]
    message = str(request.data.get("message") or "").strip()[:MAX_MESSAGE_LENGTH]
    if not sender or not message:
        return Response({"error": "'from' and 'message' are required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        chat_msg = _answer(f"wa_{sender}", message)
    except ChatUnavailable as exc:
        logger.warning("WhatsApp chat unavailable (%s): %s", exc.code, exc)
        return Response({"error": FRIENDLY.get(exc.code, FRIENDLY["provider"])}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
    except Exception:  # noqa: BLE001
        logger.exception("Unexpected WhatsApp chat error")
        return Response({"error": FRIENDLY["provider"]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response({"reply": chat_msg.response})
