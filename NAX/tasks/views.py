from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Habit, Task
from .serializers import *

@api_view(['GET', 'POST'])
def todo_list(request) :
    if request.method == 'GET':
        data = Habit.objects.all().order_by('hour')

        serializer = HabitSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = HabitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def todo_detail(request, pk):
    try:
        habit = Habit.objects.get(id=pk)
    except Habit.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = HabitSerializer(habit, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        habit.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
