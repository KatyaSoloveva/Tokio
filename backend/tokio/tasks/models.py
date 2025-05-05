from django.db import models
from django.db.models import Q
from django.contrib.auth import get_user_model
from django.utils.text import slugify
import bleach
from bleach.css_sanitizer import CSSSanitizer
from unidecode import unidecode

from core.validators import validate_category_name

User = get_user_model()


class Category(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE,
                               verbose_name='Создатель категории',
                               related_name='categories', null=True,
                               blank=True)
    name = models.CharField(max_length=255, verbose_name='Категория',
                            validators=(validate_category_name,))
    slug = models.SlugField(verbose_name='Slug',
                            max_length=256, blank=True)

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
        constraints = (
            models.UniqueConstraint(
                fields=('author', 'name'),
                name='unique_category_author_name',
            ),
            models.UniqueConstraint(
                fields=('author', 'slug'),
                name='unique_author_slug'
            )
        )

    def __str__(self):
        return self.name[:30]

    def get_unique_slug(self, base_slug):
        slug = base_slug
        counter = 0
        while Category.objects.filter(author=self.author, slug=slug).exists():
            counter += 1
            slug = f"{base_slug}-{counter}"
        return slug

    def save(self, *args, **kwargs):
        if not self.id:
            base_slug = slugify(unidecode(self.name))
            self.slug = self.get_unique_slug(base_slug)
        super().save(*args, **kwargs)


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
    name = models.CharField(max_length=255, verbose_name='Заметка',
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
                name='unique_task_author_name',
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
        super().save(*args, **kwargs)

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
