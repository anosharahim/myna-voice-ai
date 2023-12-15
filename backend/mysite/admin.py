from django.contrib import admin
from .models import AudioItem


class AudioItemAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'audio_id',
                    'website_url', 'text_content', 'embedding')


admin.site.register(AudioItem, AudioItemAdmin)

