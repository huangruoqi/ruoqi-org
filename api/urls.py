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
        words = text.split()
        prediction = sentiment_pipeline(words)
        values = []
        gap = 0.4
        for p in prediction :
            score = p["score"]
            if p["label"]=="POSITIVE":
                score += 1-2*gap
            else:
                score = 1-score+gap
            score = score / (2-2*gap)
            values.append(score)

        assert len(values) == len(words)

        if text:
            response = {
                "success": True,
                "message": "Text received: {}".format(text),
                "sentiment": sentiment_pipeline([text]),
                "words": words,
                "values": values
            }
        else:
            response = {"success": False, "message": "No text received"}

        return JsonResponse(response)
    else:
        return JsonResponse({"success": False, "message": "Invalid request method"})


urlpatterns = [
    path("submit-text", submit_text),
]
