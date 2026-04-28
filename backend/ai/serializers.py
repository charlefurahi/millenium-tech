# backend/ai/serializers.py
from rest_framework import serializers


class ChatMessageSerializer(serializers.Serializer):
    role = serializers.ChoiceField(choices=["user", "assistant", "system"])
    content = serializers.CharField(allow_blank=False)


class ChatRequestSerializer(serializers.Serializer):
    message = serializers.CharField(allow_blank=False)
    history = ChatMessageSerializer(many=True, required=False, default=list)
