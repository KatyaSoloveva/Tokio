# Generated by Django 3.2.3 on 2025-02-20 04:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_user_birthday'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='birthday',
            field=models.DateField(blank=True, null=True, verbose_name='День рождения'),
        ),
    ]
