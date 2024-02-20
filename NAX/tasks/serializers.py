from rest_framework import serializers
from .models import Habit, Task

class HabitSerializer(serializers.ModelSerializer):

    class Meta:
        model = Habit
        fields = ('pk', 'name', 'hour', 'completed')


class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ('pk', 'name', 'hour', 'completed', 'date')
