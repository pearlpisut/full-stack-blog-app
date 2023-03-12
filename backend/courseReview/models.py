from django.db import models
from ckeditor.fields import RichTextField

# Create your models here.
class Review(models.Model):
    code = models.CharField(max_length=8)
    title = models.CharField(max_length=100)
    dateTaken = models.CharField(max_length=50, default="2021/2022")
    instructor = models.CharField(max_length=50, default="prof.")
    assessment = models.CharField(max_length=150, default = "exam")
    # review = models.TextField()
    review = RichTextField(blank=True, null=True)


    def __str__(self):
        return self.code + " " + self.title