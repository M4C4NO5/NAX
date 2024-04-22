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
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    class Meta:
        unique_together = [['user_id', 'hour']]

class Task(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    name = models.CharField(max_length=100, null=False)
    hour = models.TimeField(null=False)
    completed = models.BooleanField(null=False)
    date = models.DateField(null=False, default=timezone.now)
    id_habit= models.IntegerField(null=False)
    user_id= models.ForeignKey(User, on_delete=models.CASCADE, default=1)

def create_Task(sender, instance, created, **kwargs):
    Task.objects.create(
        id_habit=instance.id,
        name=instance.name,
        hour=instance.hour,
        completed=instance.completed,
        date=timezone.now(),
        user_id=instance.user_id
    )
