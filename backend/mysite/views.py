from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
import trafilatura
from trafilatura.settings import use_config
import torch
from TTS.api import TTS
from uuid import uuid4
from .models import TextLibrary
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import speech_recognition as sr

newconfig = use_config()
newconfig.set("DEFAULT", "EXTRACTION_TIMEOUT", "0")

# Security


class DisableCSRFMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        setattr(request, '_dont_enforce_csrf_checks', True)
        response = self.get_response(request)
        return response


class TextSearchView(APIView):
    def post(self, request):
        if 'url' not in request.data:
            return Response({'error': 'missing url in request data'}, status=400)

        url = request.data.get('url', '')
        if not TextLibrary.objects.filter(website_url=url).exists():
            main_content = trafilatura.fetch_url(url)
            extracted_text = trafilatura.extract(
                main_content, output_format="text", config=newconfig)
            audio_url = text_to_audio(request, extracted_text[:1024], url)
        else:
            audio_url = TextLibrary.objects.get(website_url=url).audio_id

        return Response({'audio_url': audio_url}, status=200)


def text_to_audio(request, content, url):
    '''Converts extracted content into an audio file, and saves it to user's text library.'''
    # wav = tts.tts(content, speaker=tts.speakers[0], language=tts.languages[0])
    user = request.user
    if not request.user.id:
        return Response({'error': "No user"}, status=403)
    if not TextLibrary.objects.filter(user=user, website_url=url).exists():

        device = "cuda" if torch.cuda.is_available() else "cpu"

        model_name = TTS().list_models()[0]
        tts = TTS(model_name).to(device)

        # get audio file
        file_id = uuid4()
        TextLibrary.objects.create(
            user=user, title='', website_url=url, audio_id=file_id)

        file_path = f"/Users/anosharahim/storyteller-ai/backend/uploads/{file_id}.wav"
        tts.tts_to_file(
            text=content, speaker=tts.speakers[0], language=tts.languages[0], file_path=file_path)

    return "static/" + TextLibrary.objects.get(website_url=url, user=user).audio_id + ".wav"


# User SIGNUP/LOGIN/LOGOUT Views
def sign_up(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('name')
        password = data.get('password')

        if not User.objects.filter(username=username).exists():
            User.objects.create_user(username=username, password=password)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False})

    return JsonResponse({'error': 'Invalid request method'}, status=405)


def check_is_authenticated(request):
    if request.user and request.user.id:
        return JsonResponse({"the message": "success"}, status=200)
    else:
        return JsonResponse({"error": "not logged in"}, status=403)


def login_handler(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('name')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'success': True}, status=200)
        else:
            return JsonResponse({'success': False}, status=403)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


def logout_handler(request):
    logout(request)
    return JsonResponse({'success': True}, status=200)
