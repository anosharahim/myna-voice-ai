from django.contrib import admin
from .models import TextLibrary, UserAudios


class TextAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'audio_id',
                    'website_url', 'text_content')


class UserAudioAdmin(admin.ModelAdmin):
    list_display = ('user', 'audio')


# Register models here.
admin.site.register(TextLibrary, TextAdmin)
admin.site.register(UserAudios, UserAudioAdmin)
