from django.contrib import admin
from .models import GlobalAudioLibrary, UserAudios


class GlobalAudioAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'audio_id',
                    'website_url', 'text_content', 'embedding')


class UserAudioAdmin(admin.ModelAdmin):
    list_display = ('user', 'audio')


# Register models here.
admin.site.register(GlobalAudioLibrary, GlobalAudioAdmin)
admin.site.register(UserAudios, UserAudioAdmin)
