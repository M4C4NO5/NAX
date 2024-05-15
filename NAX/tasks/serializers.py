from rest_framework import serializers
from .models import Habit, Task

class CustomTimeField(serializers.TimeField):
    def to_representation(self, value):
        if value is None:
            return None
        return value.strftime("%H:%M")


class HabitSerializer(serializers.ModelSerializer):
    hour = CustomTimeField()
    hour_end = CustomTimeField()

    class Meta:
        model = Habit
        fields = ('id', 'name', 'hour', 'completed', 'user_id', 'description', 'calendar_id', 'hour_end')


class TaskSerializer(serializers.ModelSerializer):
    hour = CustomTimeField()

    class Meta:
        model = Task
        fields = ('id', 'name', 'hour', 'completed', 'date', 'user_id', 'description', 'calendar_id', 'hour_end')

