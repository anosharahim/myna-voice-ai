from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import trafilatura

class TextSearchView(APIView):
    def post(self, request):
        # url = ''
        if request.method == 'POST':
            url = request.data.get('url', '')
            main_content = trafilatura.fetch_url(url)
            extracted_text = trafilatura.extract(main_content, output_format="text")
    
            return Response({'url': url, 'main_content': extracted_text}, status=200)