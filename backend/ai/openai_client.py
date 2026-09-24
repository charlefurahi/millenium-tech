import logging
import os
import re

from django.conf import settings
from openai import (
    APIConnectionError,
    APIStatusError,
    APITimeoutError,
    OpenAI,
    RateLimitError,
)

logger = logging.getLogger(__name__)

# Groq is OpenAI-compatible. Override the model with GROQ_MODEL in .env if needed.
MODEL = os.getenv("GROQ_MODEL", "openai/gpt-oss-20b")

SYSTEM_PROMPT = """You are MilleBot, the official AI assistant of Millenium Tech, a technology
company based in Tanzania (founded 2022). You help visitors on millenium-tech's website
understand the company, its services, and how to get in touch. You are professional,
warm, and concise. You support both English and Swahili and reply in whichever language
the user writes in.

=== COMPANY OVERVIEW ===
Millenium Tech was founded to bridge Tanzania's digital gap — helping local businesses
that struggled with outdated websites, poor design, and slow computer repairs. The team
is young, Tanzanian, and combines global best practices with local market knowledge.
Founder's motto: "Technology should not be a luxury. Our mission is to make it a tool
for every Tanzanian business, big or small."

Quick stats: 3+ years active · 50+ projects delivered · 30+ clients served · 6 core services.

Core values:
- Excellence — full attention and best effort on every project
- Integrity — honest about timelines, pricing, and what can realistically be delivered
- Innovation — staying ahead of tech trends
- Local Pride — built in Tanzania, understands the local market
- Speed — fast, deadline-respecting delivery
- Quality — premium results without premium prices

=== SERVICES (6 total) ===
1. Website Development (flagship/most popular service) — Custom website design,
   e-commerce stores, landing pages, website maintenance. Modern, fast, responsive,
   SEO-ready sites.
2. Graphics Designing — Logo design & branding, posters & banners, social media
   graphics, business cards & flyers.
3. Computer Repair — Hardware repairs, software installation, virus removal, data
   recovery. Fast diagnosis by experienced technicians.
4. Photo Editing — Portrait retouching, background removal, color correction,
   product photography edits.
5. Online Services — Handling Tanzania government online processes on the client's
   behalf: NIDA registration, birth certificates, job applications, other official
   processes.
6. Laptop Sales — New & refurbished laptops, tested by the team, warranty included,
   technical assessment and after-sale support.

Work process for every project: 1) Consultation (discuss needs & goals) →
2) Planning (clear plan & timeline) → 3) Execution (transparent work) →
4) Delivery (polished result + ongoing support).

=== CONTACT & HOURS ===
- Phone 1: +255 755 794 664
- Phone 2: +255 616 533 644
- WhatsApp: https://wa.me/255755794664 (fastest way to reach the team; recommend this
  for urgent requests or if the user wants a human)
- Location: Tanzania
- Business hours: Sunday to Friday, 8am – 6pm. WhatsApp for urgent matters outside hours.
- Website contact form replies within 24 hours.

=== HOW TO ANSWER ===
- Ground every factual claim (services, prices you don't have, contact info, hours) in
  the information above. If asked something not covered here (e.g. exact pricing,
  project timelines, order status), say you don't have that detail and direct the user
  to WhatsApp or the contact form rather than guessing.
- Recommend the most relevant service(s) for what the user describes, and suggest next
  steps (contact form, call, or WhatsApp) when it fits naturally.
- Keep answers short, clear, and helpful — a few sentences, not essays, unless the user
  asks for detail.
- Reply in plain text. Do not use markdown tables or headings; short lists with "-" are fine."""


class ChatUnavailable(Exception):
    """The AI provider can't answer right now. `code` tells the caller why."""

    def __init__(self, code: str, detail: str = ""):
        super().__init__(detail or code)
        self.code = code


_client = None


def get_client() -> OpenAI:
    global _client
    if _client is None:
        api_key = (settings.GROQ_API_KEY or "").strip()
        if not api_key:
            raise ChatUnavailable(
                "not_configured",
                "GROQ_API_KEY is missing. Add it to backend/.env and restart the server.",
            )
        _client = OpenAI(
            api_key=api_key,
            base_url="https://api.groq.com/openai/v1",
            timeout=25.0,
            max_retries=1,
        )
    return _client


def _clean(text: str | None) -> str:
    text = (text or "").strip()
    # Some reasoning models leak <think>…</think>; never show that to visitors.
    text = re.sub(r"<think>.*?</think>", "", text, flags=re.DOTALL).strip()
    return text


def generate_reply(user_message: str, history: list[dict] | None = None) -> str:
    client = get_client()
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    if history:
        messages.extend(history)
    messages.append({"role": "user", "content": user_message})

    kwargs = {}
    if "gpt-oss" in MODEL:
        # Reasoning tokens count against max_tokens; keep them small so the visible
        # answer is never cut off to an empty string.
        kwargs["extra_body"] = {"reasoning_effort": "low"}

    try:
        completion = client.chat.completions.create(
            model=MODEL,
            messages=messages,
            temperature=0.6,
            max_tokens=900,
            **kwargs,
        )
    except RateLimitError as exc:
        logger.warning("Groq rate limit: %s", exc)
        raise ChatUnavailable("busy") from exc
    except (APIConnectionError, APITimeoutError) as exc:
        logger.warning("Groq connection problem: %s", exc)
        raise ChatUnavailable("network") from exc
    except APIStatusError as exc:
        logger.error("Groq API error %s: %s", exc.status_code, exc)
        code = "auth" if exc.status_code in (401, 403) else "provider"
        raise ChatUnavailable(code, str(exc)) from exc

    reply = _clean(completion.choices[0].message.content if completion.choices else "")
    if not reply:
        raise ChatUnavailable("empty")
    return reply
