from django.db import models
from django.db.models import Q
from django.contrib.auth import get_user_model
import bleach
from bleach.css_sanitizer import CSSSanitizer

User = get_user_model()


class Category(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE,
                               verbose_name='Создатель категории',
                               related_name='categories', null=True,
                               blank=True)
    name = models.CharField(max_length=255, verbose_name='Категория')
    slug = models.SlugField(unique=True, verbose_name='Slug',
                            max_length=256)

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self):
        return self.name[:30]


class Task(models.Model):
    class Status(models.TextChoices):
        IN_PROGRESS = 'in_progress', 'В процессе'
        DONE = 'done', 'Сделано'
        NOT_STARTED = 'not_started', 'Не начато'

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
    categories = models.ManyToManyField(Category, verbose_name='Категории',
                                        blank=True)
    status = models.CharField(max_length=20, choices=Status.choices,
                              verbose_name='Статус заметки',
                              default=Status.NOT_STARTED)

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
        return self.name[:30]

    def save(self, *args, **kwargs):
        self.text = self.clean_html(self.text)
        if not self.name:
            counter = Task.objects.filter(
                author=self.author,
                name__startswith='Безымянная заметка'
            ).count()
            self.name = f'Безымянная заметка {counter + 1}'
        return super().save(*args, **kwargs)

    @staticmethod
    def clean_html(cleaned_text):
        if cleaned_text:
            css_sanitizer = CSSSanitizer(
                allowed_css_properties=('font-family', 'color',
                                        'background-color', 'text-align',
                                        'min-width')
            )
            tags = {'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'ol',
                    'li', 'ul', 'table', 'tbody', 'th', 'tr', 'td', 'div',
                    'colgroup', 'col', 'br', 'strong'}
            attrs = {'*': ['style']}
            return bleach.clean(cleaned_text, tags=tags,
                                attributes=attrs, css_sanitizer=css_sanitizer)
