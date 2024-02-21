from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import DjangoJobStore
from django_apscheduler.jobstores import register_events
from django_apscheduler.jobstores import register_job
from django.utils import timezone
from .models import Habit

scheduler = BackgroundScheduler(timezone="UTC")
scheduler.add_jobstore(DjangoJobStore(), "default")

@register_job(scheduler, "cron", day_of_week='sun', hour=0, minute=0)

def reset_habit():
    Habit.objects.all().update(completed=False)

register_events(scheduler)
scheduler.start()