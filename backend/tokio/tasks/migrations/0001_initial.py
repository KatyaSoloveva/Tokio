# Generated by Django 5.1.6 on 2025-05-10 16:46

import core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, validators=[core.validators.validate_category_name], verbose_name='Категория')),
                ('slug', models.SlugField(blank=True, help_text='Поле заполняется автоматически, но при желании может быть заполнено самостоятельно', verbose_name='Slug')),
                ('is_system', models.BooleanField(default=False)),
                ('author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='categories', to=settings.AUTH_USER_MODEL, verbose_name='Создатель категории')),
            ],
            options={
                'verbose_name': 'Категория',
                'verbose_name_plural': 'Категории',
            },
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, default=None, max_length=255, verbose_name='Заметка')),
                ('text', models.TextField(blank=True, null=True, verbose_name='Текст заметки')),
                ('pub_date', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания заметки')),
                ('update_date', models.DateTimeField(auto_now=True, verbose_name='Дата обновления заметки')),
                ('image', models.ImageField(blank=True, null=True, upload_to='tasks/images', verbose_name='Заставка заметки')),
                ('status', models.CharField(choices=[('in_progress', 'В процессе'), ('done', 'Сделано'), ('not_started', 'Не начато')], default='not_started', max_length=20, verbose_name='Статус заметки')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tasks_author', to=settings.AUTH_USER_MODEL, verbose_name='Автор заметки')),
                ('categories', models.ManyToManyField(blank=True, to='tasks.category', verbose_name='Категории')),
                ('collaborators', models.ManyToManyField(blank=True, related_name='tasks_collaborators', to=settings.AUTH_USER_MODEL, verbose_name='Коллабораторы')),
            ],
            options={
                'verbose_name': 'Заметка',
                'verbose_name_plural': 'Заметки',
                'ordering': ('-pub_date',),
            },
        ),
        migrations.CreateModel(
            name='CollaborationRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('pending', 'Ожидает подтверждения'), ('accepted', 'Принято'), ('rejected', 'Отклонено')], default='pending', max_length=20, verbose_name='Статус запроса')),
                ('request_date', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания запроса на сотрудничество')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='requests_author', to=settings.AUTH_USER_MODEL, verbose_name='Пригласивший')),
                ('collaborator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='requests_receiver', to=settings.AUTH_USER_MODEL, verbose_name='Приглашенный')),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tasks.task', verbose_name='Задача')),
            ],
            options={
                'verbose_name': 'Запрос на коллаборацию',
                'verbose_name_plural': 'Запросы на коллаборацию',
                'ordering': ('-request_date',),
            },
        ),
        migrations.AddConstraint(
            model_name='category',
            constraint=models.UniqueConstraint(fields=('author', 'name'), name='unique_category_author_name'),
        ),
        migrations.AddConstraint(
            model_name='category',
            constraint=models.UniqueConstraint(fields=('author', 'slug'), name='unique_author_slug'),
        ),
        migrations.AddConstraint(
            model_name='task',
            constraint=models.UniqueConstraint(condition=models.Q(('name__isnull', False)), fields=('author', 'name'), name='unique_task_author_name'),
        ),
        migrations.AddConstraint(
            model_name='collaborationrequest',
            constraint=models.UniqueConstraint(fields=('task', 'author', 'collaborator'), name='unique_task_author_collaborator'),
        ),
    ]
