from django.contrib import admin
from django.urls import path
import json
import math
from django.http import JsonResponse
from rest_framework.decorators import api_view
from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification


tokenizer = AutoTokenizer.from_pretrained("Seethal/sentiment_analysis_generic_dataset")
model = AutoModelForSequenceClassification.from_pretrained("Seethal/sentiment_analysis_generic_dataset")
sentiment_pipeline = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)

def process_words(words):
    n = len(words)
    def get_value(*parray):
        # convert = lambda p: p["score"] if p["label"][0]=="P" else 1-p["score"]
        # return math.tanh(sum([convert(p) for p in parray]))
        convert = lambda p: int(p["label"][-1])+p["score"]
        return sum([convert(p) for p in parray])/len(parray)
    def get_segments(length):
        return sentiment_pipeline([
            " ".join(words[max(0, i-length//2):min(n, i+(length+1)//2)])
            for i in range(n)
        ])
    return list(map(get_value, get_segments(1), get_segments(3)))

@api_view(["POST"])
def submit_text(request):
    if request.method == "POST":
        text = json.loads(request.body).get("text", None)
        words = text.split()

        values = process_words(words)

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
