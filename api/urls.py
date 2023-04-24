from django.contrib import admin
from django.urls import path
import json
from django.http import JsonResponse
from rest_framework.decorators import api_view
from transformers import pipeline

sentiment_pipeline = pipeline("sentiment-analysis")


@api_view(["POST"])
def submit_text(request):
    if request.method == "POST":
        text = json.loads(request.body).get("text", None)

        if text:
            response = {
                "success": True,
                "message": "Text received: {}".format(text),
                "sentiment": sentiment_pipeline([text]),
            }
        else:
            response = {"success": False, "message": "No text received"}

        return JsonResponse(response)
    else:
        return JsonResponse({"success": False, "message": "Invalid request method"})


urlpatterns = [
    path("submit-text", submit_text),
]
