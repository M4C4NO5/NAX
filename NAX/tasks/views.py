from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Habit, Task
from .serializers import *
from datetime import timedelta, datetime
from django.db import IntegrityError

@api_view(['GET', 'POST'])
def todo_list(request) :
    if request.method == 'GET':
        data = Habit.objects.all().order_by('hour')

        serializer = HabitSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = HabitSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                serializer.save()
            except IntegrityError:
                return Response({"error":"Habits cannot have the same hour."}, status=status.HTTP_406_NOT_ACCEPTABLE)
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def todo_detail(request, pk):
    try:
        habit = Habit.objects.get(id=pk)
    except Habit.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = HabitSerializer(habit, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        habit.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def reset_habit(request):
    habits = Habit.objects.all()
    if Task.objects.exists() :
        date = Task.objects.latest('date').date + timedelta(days=1)
    else :
        date = datetime.now()

    for habit in habits:
        Task.objects.create(
            name=habit.name,
            hour=habit.hour,
            completed=habit.completed,
            date=date
        )
    habits.update(completed=False)

    return Response(date)

@api_view(['POST'])
def create_default_habits(request):
    if request.method == "POST":
        default_habits= [
            {"name": "Hacer ejercicio", "hour": "8:00"},
            {"name": "Comer potasio", "hour": "12:00"},
            {"name": "Estudiar", "hour": "5:00"},
            {"name": "Dormir", "hour": "9:00"}
        ]

        for habit_data in default_habits:
            Habit.objects.create(
                name=habit_data['name'], hour=habit_data['hour'])

        return Response({'message': 'Default habits created successfully'}, status=201)


