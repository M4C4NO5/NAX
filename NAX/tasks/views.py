from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Habit, Task
from .serializers import *
from datetime import timedelta, datetime
from django.db import IntegrityError

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def todo_list(request) :
    if request.method == 'GET':
        user_id = request.user.id
        data = Habit.objects.filter(user_id=user_id).order_by('hour')

        serializer = HabitSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        request.data['user_id'] = request.user.id
        serializer = HabitSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                serializer.save()
            except IntegrityError:
                return Response({"error":"Habits cannot have the same hour."}, status=status.HTTP_406_NOT_ACCEPTABLE)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
def reset_habit(request):
    habits = Habit.objects.filter(user_id=request.user.id)
    if Task.objects.exists() :
        date = Task.objects.latest('date').date + timedelta(days=1)
    else :
        date = datetime.now()

    for habit in habits:
        Task.objects.create(
            id_habit=habit.id,
            name=habit.name,
            hour=habit.hour,
            completed=habit.completed,
            date=date,
            user_id=request.user
        )
    habits.update(completed=False)

    return Response(date)
