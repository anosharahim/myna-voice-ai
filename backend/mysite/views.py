from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import trafilatura
from trafilatura.settings import use_config
import torch
from TTS.api import TTS

newconfig = use_config()
newconfig.set("DEFAULT", "EXTRACTION_TIMEOUT", "0")
device = "cuda" if torch.cuda.is_available() else "cpu"

model_name = TTS().list_models()[0]
tts = TTS(model_name).to(device)


class TextSearchView(APIView):
    def post(self, request):

        if request.method == 'POST':
            url = request.data.get('url', '')
            main_content = trafilatura.fetch_url(url)
            extracted_text = trafilatura.extract(
                main_content, output_format="text", config=newconfig)
            text_to_audio(extracted_text[:1024])

            return Response({'url': url, 'main_content': extracted_text}, status=200)


def text_to_audio(content):

    device = "cuda" if torch.cuda.is_available() else "cpu"
def text_to_audio(content, url):
    # wav = tts.tts(content, speaker=tts.speakers[0], language=tts.languages[0])
    if not TextLibrary.objects.filter(website_url=url).exists():
        # get audio file
        file_id = uuid4()
        TextLibrary.objects.create(title='', website_url=url, audio_id=file_id)

        file_path = f"/Users/anosharahim/storyteller-ai/backend/uploads/{file_id}.wav"
        tts.tts_to_file(
            text=content, speaker=tts.speakers[0], language=tts.languages[0], file_path=file_path)

    return wav
