from django.db import models
from django.contrib.auth.models import User


class AudioItem(models.Model): 
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=120)
    audio_id = models.TextField(default=None)
    website_url = models.URLField(unique=True)
    text_content = models.TextField(null=True)
    embedding = models.JSONField(null=True)

    def __str__(self):
        return self.title

