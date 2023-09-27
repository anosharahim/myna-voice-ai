from django.contrib import admin
from .models import TextLibrary


class TextAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'audio_id',
                    'website_url', 'text_content')


# Register models here.
admin.site.register(TextLibrary, TextAdmin)
