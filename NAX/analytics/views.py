from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count
from tasks.models import Habit

@api_view(['GET'])
def most_common_habits(request):
    habits = Habit.objects.all().values('name').annotate(Count('name')).order_by('-name__count')
    return Response(habits)


