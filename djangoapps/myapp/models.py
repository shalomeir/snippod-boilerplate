from django.db import models


class Comment(models.Model):
    name = models.TextField()
    text = models.TextField()
    date_added = models.DateField(auto_now_add=True)
