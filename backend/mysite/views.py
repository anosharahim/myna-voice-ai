from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

class TextSearchView(APIView):
    def post(self, request):
        # url = ''
        if request.method == 'POST':
            url = request.data.get('url', '')
            
        return Response({'url': url}, status=200)
