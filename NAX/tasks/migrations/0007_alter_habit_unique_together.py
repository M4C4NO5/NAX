# Generated by Django 5.0.6 on 2024-05-15 03:13

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("tasks", "0006_habit_calendar_id_habit_description_habit_hour_end_and_more"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="habit",
            unique_together=set(),
        ),
    ]
