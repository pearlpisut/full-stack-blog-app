from django.contrib import admin
from .models import Review

# Register your models here.
@admin.register(Review)
class ReviewModel(admin.ModelAdmin):
    list_filter = ['code', 'dateTaken']
    list_display = ['code', 'title', 'instructor']