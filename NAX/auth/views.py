from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from tasks.models import Habit

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

class RegisterView(APIView):
    def post(self, request):
        try:
            user = User.objects.create_user(
                first_name=request.data["first_name"],
                last_name=request.data["last_name"],
                username=request.data["email"],
                email=request.data["email"],
                password=request.data["password"],
            )
            user.save()

            default_habits = [
                {"name": "Hacer ejercicio", "hour": "8:00"},
                {"name": "Comer potasio", "hour": "12:00"},
                {"name": "Estudiar", "hour": "5:00"},
                {"name": "Dormir", "hour": "9:00"}
            ]

            for habit_data in default_habits:
                Habit.objects.create(
                    name=habit_data['name'],
                    hour=habit_data['hour'],
                    user_id=user
                )

            return Response({'message': 'User was created'})
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)
