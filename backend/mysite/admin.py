from django.contrib import admin
from .models import TextLibrary, UserAccount


class TextAdmin(admin.ModelAdmin):
    list_display = ('title', 'audio_id', 'website_url', 'text_content')


class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'password')


# Register your models here.
admin.site.register(TextLibrary, TextAdmin)
admin.site.register(UserAccount, UserAdmin)
