# Generated by Django 3.0.9 on 2020-08-03 21:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('avatars', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='avatar',
            name='title',
        ),
    ]
