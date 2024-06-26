import requests
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
import trafilatura
from trafilatura.settings import use_config
import torch
from TTS.api import TTS
from uuid import uuid4
from .models import AudioItem
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
import json
import speech_recognition as sr
import openai
# import requests
from bs4 import BeautifulSoup
from pydub import AudioSegment
import os
from dotenv import load_dotenv
import boto3
from django.core.files.storage import default_storage
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods


newconfig = use_config()
newconfig.set("DEFAULT", "EXTRACTION_TIMEOUT", "0")


class DisableCSRFMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        setattr(request, '_dont_enforce_csrf_checks', True)
        response = self.get_response(request)
        return response


class TextSearchView(APIView):
    '''Recieves blog urls from frontend, extracts text content, and passes to generate audio.'''

    def post(self, request):
        if 'url' not in request.data:
            return Response({'error': 'missing url in request data'}, status=400)
        url = request.data.get('url', '')
        if not AudioItem.objects.filter(website_url=url).exists():
            html_content = trafilatura.fetch_url(url)
            extracted_text = trafilatura.extract(
                html_content, output_format="text", config=newconfig)

            # Get the title of the article
            soup = BeautifulSoup(html_content, 'html.parser')
            title_tag = soup.find('title')
            content_title = title_tag.text if title_tag else "Title not found"

            audio_url = text_to_audio(
                request, extracted_text[:1024], url, content_title)

        else:
            audio_url = AudioItem.objects.get(
                website_url=url).audio_id
            audio_url = f"{settings.STATIC_URL}{audio_url}.wav"
        return Response({'audio_url': audio_url}, status=200)


class AudioLibraryView(APIView):
    '''Sends user's audio library data to client.'''

    def get(self, request):
        user = request.user
        user_audios = AudioItem.objects.filter(
            user=user).values('title', 'audio_id')
        audio_library_data = [{'title': audio['title'],
                               'url': f"static/{audio['audio_id']}.wav"} for audio in user_audios]
        return Response({'audio_library_data': audio_library_data}, status=200)


def text_to_audio(request, content, url, title):
    '''Converts extracted content into an audio file, and saves it to DB.'''

    user = request.user
    if not request.user.id:
        return Response({'error': "No user"}, status=403)
    if not AudioItem.objects.filter(user=user, website_url=url).exists():
        device = "cuda" if torch.cuda.is_available() else "cpu"
        tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2", gpu=False)

        file_id = uuid4()
        file_name = f"{file_id}.wav"
        file_path = f"uploads/{file_name}"

        with default_storage.open(file_path, 'wb') as destination:
            tts.tts_to_file(
                text=content, 
                speaker="Ana Florence",
                file_path=destination,
                language='en',
                split_sentences=True
            )

        audio_item = AudioItem.objects.create(user=user, title=title, website_url=url, audio_id=file_id)
        audio_item.audio_file = file_path
        audio_item.save()

        # Return S3 URL
        return f"{settings.STATIC_URL}{file_path}"


class AudioLibraryView(APIView):
    '''Sends user's audio library data to client.'''

    def get(self, request):
        user = request.user
        if user.is_authenticated:
            user_audios = AudioItem.objects.filter(
                user=user).values('title', 'audio_id')
            audio_library_data = [{'title': audio['title'],
                                   'audio_id': audio['audio_id'],
                                'url': f"{settings.STATIC_URL}uploads/{audio['audio_id']}.wav"} for audio in user_audios]
            return Response({'audio_library_data': audio_library_data}, status=200)
        else: 
            return Response({'error': 'User not authenticated'}, status=401)


# Load environment variables from .env file
load_dotenv()
# Access the environment variables
aws_access_key_id = os.getenv("S3_KEY")
aws_secret_access_key = os.getenv("S3_SECRET")

@require_http_methods(["DELETE"])       
def delete_audio(request):
    try:
    
        audio_id = request.GET.get('audio_to_delete')
        audio_url = f'https://s3-{settings.AWS_S3_REGION_NAME}.amazonaws.com/{settings.AWS_STORAGE_BUCKET_NAME}uploads/{audio_id}.wav'

        #delete from s3
        s3_client = boto3.client(
            's3',
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key,
            region_name=settings.AWS_S3_REGION_NAME
        )
        object_key = f'uploads/{audio_id}.wav'
        s3_client.delete_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=object_key)

        AudioItem.objects.filter(audio_id=audio_id).delete() #delete from DB
        
        return JsonResponse({'message': 'Audio deleted successfully'})
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    


def sign_up(request):
    '''Creates a new account for the user.'''
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


@login_required
def check_is_authenticated(request):
    '''Checks if user is authenticated.'''
    if request.user.is_authenticated:
        return JsonResponse({"message": "successfully logged in"}, status=200)
    else:
        return JsonResponse({"error": "not logged in"}, status=403)


def login_handler(request):
    '''Logs users into their account.'''
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
    '''Logs out user.'''
    logout(request)
    return JsonResponse({'success': True}, status=200)


class MessageView(APIView):
    '''Receives speech-based user input queries from the client.'''

    def post(self, request):
        if 'query' in request.data:
            query = request.data.get('query', '')
            prompt = self.generatePrompt(query)
            response = openai.ChatCompletion.create(
                model='gpt-4',
                messages=[{'role': 'user', 'content': prompt}],
                temperature=0.3,
                api_key=OPENAI_GPT4_KEY,
            )
            result = response.choices[0].message.content
            # TODO: convert result into audio to be played by the frontend.
            return Response({'result': result}, status=200)

        else:
            return Response({'error': "No user input detected"})

    def generatePrompt(self, user_query):
        '''Generates LLM prompt from user query.'''
        # TODO: engineer the prompt for better output
        prompt = user_query + "be concise."
        return prompt
    

# def create_embedding(text):
#     '''Generates embeddings for audio text.'''
#     openai.api_key = OPENAI_GPT4_KEY
#     openai_response = openai.Embedding.create(
#         input=text,
#         model="text-embedding-ada-002"
#     )
#     embeddings = openai_response['data'][0]['embedding']
#     return embeddings
