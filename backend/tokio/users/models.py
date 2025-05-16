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
