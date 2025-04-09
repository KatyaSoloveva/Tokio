from django.db import models
from django.db.models import Q
from django.contrib.auth import get_user_model

User = get_user_model()


class Task(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE,
                               verbose_name='Автор заметки',
                               related_name='tasks_author')
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             null=True, blank=True,
                             verbose_name='Пользователь',
                             related_name='tasks_user')
    name = models.CharField(max_length=255, verbose_name='Заметка', null=True,
                            blank=True, default=None)
    text = models.TextField(null=True, blank=True,
                            verbose_name='Текст заметки')
    pub_date = models.DateTimeField(auto_now_add=True,
                                    verbose_name='Дата создания заметки')
    update_date = models.DateTimeField(auto_now=True,
                                       verbose_name='Дата обновления заметки')
    image = models.ImageField(upload_to='tasks/images',
                              null=True, blank=True,
                              verbose_name='Заставка заметки')

    class Meta:
        verbose_name = 'Заметка'
        verbose_name_plural = 'Заметки'
        ordering = ('-pub_date',)
        constraints = (
            models.UniqueConstraint(
                fields=('author', 'name'),
                name='unique_author_name',
                condition=Q(name__isnull=False),
            ),
        )

    def __str__(self):
        return self.name[:20]

    def save(self, *args, **kwargs):
        if not self.name:
            counter = Task.objects.filter(
                author=self.author,
                name__startswith='Безымянная заметка'
            ).count()
            self.name = f'Безымянная заметка {counter + 1}'
        return super().save(*args, **kwargs)
