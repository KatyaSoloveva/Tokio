from rest_framework import viewsets
from django.contrib.auth import get_user_model

from .serializers import TaskSerializer
from tasks.models import Task


User = get_user_model()


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
