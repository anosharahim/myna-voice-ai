from django.db import models
from django.contrib.auth.models import User


class TextLibrary(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=120)
    audio_id = models.TextField(default=None)
    website_url = models.URLField()
    text_content = models.TextField(null=True)

    def __str__(self):
        return self.title
