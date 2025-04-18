from rest_framework import viewsets
from django.contrib.auth import get_user_model

from .serializers import TaskSerializer
from tasks.models import Task


User = get_user_model()


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer

    def get_queryset(self):
        return Task.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
