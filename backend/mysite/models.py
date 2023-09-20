from django.db import models


class TextLibrary(models.Model):
    title = models.CharField(max_length=120)
    audio_id = models.TextField(default=None)
    website_url = models.URLField()
    text_content = models.TextField(null=True)

    def __str__(self):
        return self.title


class UserAccount(models.Model):
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=15, unique=True)

    def __str__(self):
        return self.username
