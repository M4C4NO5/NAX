import os
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
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
        request.data['hour_end'] = request.data['hour']
        serializer = HabitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def todo_detail(request, pk):
    try:
        habit = Habit.objects.get(id=pk)
    except Habit.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if habit.calendar_id :
        creds = None
        if os.path.exists("token.json"):
            creds = Credentials.from_authorized_user_file("token.json", SCOPES)

        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    "credentials.json", SCOPES
                )
                creds = flow.run_local_server(port=0)

            with open("token.json", "w") as token:
                token.write(creds.to_json())

        try:
            service = build("calendar", "v3", credentials=creds)
        except HttpError as error:
            print(error)
            return Response({})

    if request.method == 'PUT':
        request.data['user_id'] = request.user.id
        serializer = HabitSerializer(habit, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()

            if habit.calendar_id :
                date = datetime.now().date()
                if habit.hour_end is None :
                    hour_end = habit.hour
                else :
                    hour_end = habit.hour_end

                event = {
                    'summary': habit.name,
                    'description': habit.description,
                    'start': {
                        'dateTime': str(date)+'T'+str(habit.hour)+'.000-05:00',
                        'timeZone': 'America/Bogota'
                    },
                    'end': {
                        'dateTime': str(date)+'T'+str(hour_end)+'.000-05:00',
                        'timeZone': 'America/Bogota'
                    },
                    'recurrence': [
                        'RRULE:FREQ=DAILY',
                    ],
                    'reminders': {
                        'useDefault': True,
                    }
                }
                service.events().update(calendarId='primary', eventId=habit.calendar_id, body=event).execute()

            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if habit.calendar_id :
            service.events().delete(calendarId='primary', eventId=habit.calendar_id).execute()
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
            user_id=request.user,
            hour_end=habit.hour_end,
            description=habit.description,
            calendar_id=habit.calendar_id,
        )
    habits.update(completed=False)

    return Response(date)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def streak(request):

    tasks = Task.objects.filter(user_id=request.user.id).order_by('date')

    streak = 0
    day_completion = True
    current_date = tasks[0].date

    for task in tasks:
        if task.date != current_date :
            if day_completion :
                streak = streak + 1
            else :
                streak = 0
            current_date = task.date
            day_completion = True
        if not task.completed :
            day_completion = False

    if day_completion :
        streak = streak + 1
    else :
        streak = 0

    return Response(streak)


# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/calendar"]

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def calendar(request, pk):
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                "credentials.json", SCOPES
            )
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open("token.json", "w") as token:
            token.write(creds.to_json())

    try:
        service = build("calendar", "v3", credentials=creds)

        date = datetime.now().date()

        habit = Habit.objects.get(id=pk)
        if habit.hour_end is None :
            hour_end = habit.hour
        else :
            hour_end = habit.hour_end

        event = {
            'summary': habit.name,
            'description': habit.description,
            'start': {
                'dateTime': str(date)+'T'+str(habit.hour)+'.000-05:00',
                'timeZone': 'America/Bogota'
            },
            'end': {
                'dateTime': str(date)+'T'+str(hour_end)+'.000-05:00',
                'timeZone': 'America/Bogota'
            },
            'recurrence': [
                'RRULE:FREQ=DAILY',
            ],
            'reminders': {
                'useDefault': True,
            }
        }
        recurring_event = service.events().insert(calendarId='primary', body=event).execute()
        Habit.objects.filter(pk=habit.id).update(calendar_id=recurring_event['id'])

        return Response({})

    except HttpError as error:
        print(error)
        return Response({})

