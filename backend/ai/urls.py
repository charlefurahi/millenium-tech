from django.urls import path

from . import views

urlpatterns = [
    path("health/", views.health, name="health"),
    path("chat/", views.chat, name="chat"),
    path("chat/history/", views.history, name="chat-history"),
    path("whatsapp/message/", views.whatsapp_message, name="whatsapp-message"),
]
