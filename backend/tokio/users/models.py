from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from datetime import date

from core.base_models import BaseRequestModel
from core.decorators import request_constraint

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


class FriendShipRequest(BaseRequestModel):
    sender = models.ForeignKey(User, on_delete=models.CASCADE,
                               verbose_name='Отправитель запроса',
                               related_name='friends_sender')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE,
                                 verbose_name='Получатель запроса',
                                 related_name='friends_receiver')

    @request_constraint('sender', 'receiver')
    class Meta(BaseRequestModel.Meta):
        verbose_name = 'Заявка в друзья'
        verbose_name_plural = 'Заявки в друзья'

    def __str__(self):
        return f'{self.sender}-{self.receiver}'

    def clean(self):
        if FriendShipRequest.objects.filter(
            sender=self.receiver, receiver=self.sender, status__in=(
                'pending', 'accepted'
            )
        ).exists():
            raise ValidationError(
                'Заявка на дружбу с данными людьми уже существует!'
            )

    def perform_acception(self):
        self.sender.friends.add(self.receiver)
