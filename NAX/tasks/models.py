from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Habit(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    name  = models.CharField(max_length=20)
    hour = models.CharField(max_length=10)
    userid = models.ForeignKey(User, on_delete=models.CASCADE)

class Task(models.Model):
    date = models.DateField(null=True)
    checked = models.BooleanField(default=False)
    habitId = models.ForeignKey(Habit, on_delete=models.CASCADE)