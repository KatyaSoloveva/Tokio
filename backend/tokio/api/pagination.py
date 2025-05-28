from rest_framework.pagination import PageNumberPagination

from core.constants import TaskLimit, UserLimit


class UserPagination(PageNumberPagination):
    page_size = UserLimit


class TaskPagination(PageNumberPagination):
    page_size = TaskLimit
