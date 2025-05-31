from django.db import models


def request_constraint(*fields):
    """Декоратор для добавления ограничения к модели."""
    def decorator(meta_class):
        meta_class.constraints = (
            models.UniqueConstraint(
                fields=fields,
                name=f'unique_{"_".join(fields)}',
                condition=models.Q(status='pending') | models.Q(
                    status='accepted'
                )
            ),
        )
        return meta_class
    return decorator
