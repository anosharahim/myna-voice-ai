from django.db import models


class TextLibrary(models.Model):
    title = models.CharField(max_length=120)
    url = models.URLField()
    text_content = models.TextField()

    def __str__(self):
        return self.title