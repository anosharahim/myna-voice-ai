from django.http import HttpResponse
from django.shortcuts import render

def url_input(request):
    if request.method == 'POST':
        # Get the URL from the POST request
        url = request.POST.get('url', '')

        # You can process the URL or display it as is
        return HttpResponse(f'Entered URL: {url}')
    else:
        # If it's a GET request, render a form to input the URL
        return render(request, 'url_input_form.html')