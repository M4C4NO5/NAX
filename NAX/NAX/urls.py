"""
URL configuration for NAX project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from tasks import views
from auth import views as viewsAuth
from analytics import views as viewsAnalytics
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/todo/$', views.todo_list),
    re_path(r'^api/todo/(\d+)$', views.todo_detail),
    re_path(r'^api/simulate/$', views.reset_habit),
    path('api/streak/', views.streak, name ='streak'),
    path('api/register/', viewsAuth.RegisterView.as_view(), name ='register'),
    path('api/logout/', viewsAuth.LogoutView.as_view(), name ='logout'),
    path('api/login/',
        jwt_views.TokenObtainPairView.as_view(),
        name ='token_obtain_pair'),
    path('api/token/refresh/',
        jwt_views.TokenRefreshView.as_view(),
        name ='token_refresh'),
    path('api/analytics/', viewsAnalytics.most_common_habits),
    re_path(r'^api/calendar/(\d+)$', views.calendar),
]
