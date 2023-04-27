from django.views.generic.base import TemplateView
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("", TemplateView.as_view(template_name="home/index.html")),
    path("home", TemplateView.as_view(template_name="home/index.html"))
]