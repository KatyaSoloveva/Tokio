from rest_framework.pagination import PageNumberPagination

from core.constants import REQUEST_LIMIT, TASK_LIMIT, USER_LIMIT


class UserPagination(PageNumberPagination):
    """Пагинация для списка пользователей."""

    page_size = USER_LIMIT


class TaskPagination(PageNumberPagination):
    """Пагинация для списка задач."""

    page_size = TASK_LIMIT


class RequestPagination(PageNumberPagination):
    """Пагинация для списка запросов."""

    page_size = REQUEST_LIMIT
