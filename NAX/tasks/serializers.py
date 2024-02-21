from rest_framework import serializers
from .models import Habit, Task

class CustomTimeField(serializers.TimeField):
    def to_representation(self, value):
        if value is None:
            return None
        return value.strftime("%H:%M")


class HabitSerializer(serializers.ModelSerializer):
    hour = CustomTimeField()

    class Meta:
        model = Habit
        fields = ('pk', 'name', 'hour', 'completed')


class TaskSerializer(serializers.ModelSerializer):
    hour = CustomTimeField()

    class Meta:
        model = Task
        fields = ('pk', 'name', 'hour', 'completed', 'date')

