from django.urls import path
from . import views

urlpatterns = [
    path("chat/", views.chat, name="chat"),
    path("chat/history/", views.history, name="chat-history"),
]
