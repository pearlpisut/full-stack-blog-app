# Generated by Django 4.1.7 on 2023-03-11 10:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courseReview', '0002_review_datetaken_review_instructor'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='assessment',
            field=models.CharField(default='exam', max_length=150),
        ),
    ]
