from rest_framework.pagination import PageNumberPagination

from core.constants import RequestLimit, TaskLimit, UserLimit


class UserPagination(PageNumberPagination):
    page_size = UserLimit


class TaskPagination(PageNumberPagination):
    page_size = TaskLimit


class RequestPagination(PageNumberPagination):
    page_size = RequestLimit
