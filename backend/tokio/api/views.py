from rest_framework import viewsets
from django.contrib.auth import get_user_model

from .serializers import (CategorySerializer, CollaborationRequestSerializer,
                          TaskWriteSerializer, TaskReadSerializer)
from tasks.models import Category, CollaborationRequest, Task


User = get_user_model()


class TaskViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return Task.objects.filter(author=self.request.user)

    def get_serializer_class(self):
        if self.action in ('list', 'retrieve'):
            return TaskReadSerializer
        return TaskWriteSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CollaborationRequestViewSet(viewsets.ModelViewSet):
    queryset = CollaborationRequest.objects.all()
    serializer_class = CollaborationRequestSerializer
