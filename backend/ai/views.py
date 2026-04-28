from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import ChatMessage
from .serializers import ChatMessageSerializer
from .openai_client import generate_reply


@api_view(["POST"])
def chat(request):
    user_message = (request.data.get("message") or "").strip()
    session_id = request.data.get("session_id", "")

    if not user_message:
        return Response(
            {"error": "Message is required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Build short history (last 10 turns of this session)
    history = []
    if session_id:
        recent = ChatMessage.objects.filter(session_id=session_id).order_by("-timestamp")[:10]
        for row in reversed(list(recent)):
            history.append({"role": "user", "content": row.message})
            history.append({"role": "assistant", "content": row.response})

    try:
        bot_reply = generate_reply(user_message, history=history)
    except Exception as e:
        return Response(
            {"error": f"AI service error: {str(e)}"},
            status=status.HTTP_502_BAD_GATEWAY,
        )

    chat_msg = ChatMessage.objects.create(
        message=user_message,
        response=bot_reply,
        session_id=session_id or None,
    )
    return Response(ChatMessageSerializer(chat_msg).data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def history(request):
    session_id = request.query_params.get("session_id")
    qs = ChatMessage.objects.all()
    if session_id:
        qs = qs.filter(session_id=session_id)
    return Response(ChatMessageSerializer(qs[:50], many=True).data)
