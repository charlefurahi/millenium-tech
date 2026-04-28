from openai import OpenAI
from django.conf import settings

SYSTEM_PROMPT = """You are MilleBot, the official assistant of Millenium Tech in Tanzania.
You help customers understand services, recommend solutions, and provide support.
You are professional, friendly, and concise. You support English and Swahili.

Millenium Tech services:
- Website Development
- Graphics Design
- Computer Repair
- Laptop Sales
- Photo Editing
- Online Services (NIDA applications, government forms, etc.)

Always recommend the most relevant service. Reply in the language the user uses
(English or Swahili). Keep answers short, clear, and helpful."""

_client = None

def get_client():
    global _client
    if _client is None:
        _client = OpenAI(api_key=settings.OPENAI_API_KEY)
    return _client

def generate_reply(user_message: str, history: list[dict] | None = None) -> str:
    client = get_client()
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    if history:
        messages.extend(history)
    messages.append({"role": "user", "content": user_message})

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        temperature=0.7,
        max_tokens=500,
    )
    return completion.choices[0].message.content.strip()
