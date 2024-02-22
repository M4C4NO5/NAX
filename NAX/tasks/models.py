from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.dispatch import receiver

# Create your models here.
class Habit(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    name  = models.CharField(max_length=100, null=False)
    hour = models.TimeField(null=False)
    completed = models.BooleanField(default=False)

class Task(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    name = models.CharField(max_length=100, null=False)
    hour = models.TimeField(null=False)
    completed = models.BooleanField(null=False)
    date = models.DateField(null=False, default=timezone.now)

def create_Task(sender, instance, created, **kwargs):
    Task.objects.create(
        name=instance.name,
        hour=instance.hour,
        completed=instance.completed,
        date=timezone.now()
    )
