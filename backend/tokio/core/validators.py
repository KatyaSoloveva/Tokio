import re

from django.core.exceptions import ValidationError


def validate_category_name(value):
    """Валидатор для поля name модели Category."""
    if not re.search(r'[A-Za-zА-Яа-яЁё\d]', value):
        raise ValidationError('Недопустимые символы')
    return value
