# Generated by Django 5.1.6 on 2025-03-24 14:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0004_alter_task_name_alter_task_text'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='name',
            field=models.CharField(max_length=255, verbose_name='Заметка'),
        ),
    ]
