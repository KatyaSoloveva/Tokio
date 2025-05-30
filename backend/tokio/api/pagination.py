from rest_framework.pagination import PageNumberPagination

from core.constants import REQUEST_LIMIT, TASK_LIMIT, USER_LIMIT


class UserPagination(PageNumberPagination):
    page_size = USER_LIMIT


class TaskPagination(PageNumberPagination):
    page_size = TASK_LIMIT


class RequestPagination(PageNumberPagination):
    page_size = REQUEST_LIMIT
