from django.db import models

class ChatMessage(models.Model):
    message = models.TextField()
    response = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    session_id = models.CharField(max_length=128, blank=True, null=True)

    class Meta:
        ordering = ["-timestamp"]

    def __str__(self):
        return f"[{self.timestamp:%Y-%m-%d %H:%M}] {self.message[:40]}"
