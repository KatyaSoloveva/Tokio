from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from datetime import date


year = date.today().year


class User(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username',)

    username = models.CharField(max_length=125,
                                unique=True, verbose_name='Логин')
    first_name = models.CharField(max_length=255, blank=True, null=True,
                                  verbose_name='Имя')
    last_name = models.CharField(max_length=255, blank=True, null=True,
                                 verbose_name='Фамилия')
    email = models.EmailField(max_length=125, unique=True,
                              verbose_name='Email')
    avatar = models.ImageField(upload_to='users/avatars', blank=True,
                               null=True, verbose_name='Аватар')
    birthday = models.DateField(null=True, blank=True,
                                verbose_name='День рождения')
    friends = models.ManyToManyField('self', verbose_name='Друзья',
                                     blank=True, symmetrical=True)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        ordering = ('username',)

    def __str__(self):
        return self.username[:20]

    def clean(self):
        if self.birthday:
            if self.birthday.year - year > 0:
                raise ValidationError('Этот год еще не настал!')
            elif (year - self.birthday.year < 5
                  or year - self.birthday.year > 100):
                raise ValidationError(
                    'Вам не может быть более 100 и менее 5 лет!'
                )


class FriendRequest(models.Model):
    class Status(models.TextChoices):
        PENDING = 'pending', 'Ожидает подтверждения'
        ACCEPTED = 'accepted', 'Принято'
        REJECTED = 'rejected', 'Отклонено'

    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             verbose_name='Отправитель запроса',
                             related_name='friends_sender')
    friend = models.ForeignKey(User, on_delete=models.CASCADE,
                               verbose_name='Получатель запроса',
                               related_name='friends_receiver')
    status = models.CharField(max_length=20, choices=Status.choices,
                              verbose_name='Статус запроса',
                              default=Status.PENDING)
    request_date = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата создания запроса в друзья'
    )

    class Meta:
        verbose_name = 'Заявка в друзья'
        verbose_name_plural = 'Заявки в друзья'
        ordering = ('-request_date',)
        constraints = (
            models.UniqueConstraint(
                fields=('user', 'friend'),
                name='unique_user_friend',
                condition=models.Q(status='pending') | models.Q(
                    status='accepted'
                )
            ),
        )

    def __str__(self):
        return f'{self.user}-{self.friend}'
