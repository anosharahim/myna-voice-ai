from django.contrib import admin
from .models import TextLibrary

class Admin(admin.ModelAdmin):
    list_display = ('title', 'url', 'text_content')

# Register your models here.

admin.site.register(TextLibrary, Admin)