from django.db import models
from django.core.exceptions import ValidationError

from core.constants import STATUS_LENGTH


class BaseRequestModel(models.Model):
    """
    Абстрактная модель.

    Основа для FriendShipRequestViewSet и CollaborationRequestViewSet.
    """

    class Status(models.TextChoices):
        PENDING = 'pending', 'Ожидает подтверждения'
        ACCEPTED = 'accepted', 'Принято'
        REJECTED = 'rejected', 'Отклонено'

    status = models.CharField(max_length=STATUS_LENGTH, choices=Status.choices,
                              verbose_name='Статус запроса',
                              default=Status.PENDING)
    request_date = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата создания запроса'
    )

    class Meta:
        abstract = True
        ordering = ('-request_date',)

    def clean(self):
        if self.sender == self.receiver:
            raise ValidationError(
                'Нельзя отправить запрос самому себе!'
            )

    def accept(self):
        self.status = self.Status.ACCEPTED
        self.perform_acception()
        self.save()

    def reject(self):
        self.status = self.Status.REJECTED
        self.save()
