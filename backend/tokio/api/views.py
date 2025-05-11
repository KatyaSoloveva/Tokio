from rest_framework import viewsets
from django.contrib.auth import get_user_model
from django.db.models import Q

from .serializers import (CategorySerializer,
                          CollaborationRequestReadSerializer,
                          CollaborationRequestWriteSerializer,
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
    serializer_class = CategorySerializer

    def get_queryset(self):
        return (Category.objects.filter(
            Q(author=self.request.user) | Q(is_system=True)
        ))


class CollaborationRequestViewSet(viewsets.ModelViewSet):

    def get_queryset(self):
        user = self.request.user
        return CollaborationRequest.objects.filter(
            Q(author=user) | Q(collaborator=user)
        ).select_related('task', 'collaborator', 'author')

    def get_serializer_class(self):
        if self.action in ('list', 'retrieve'):
            return CollaborationRequestReadSerializer
        elif self.action in ('create', 'destroy'):
            return CollaborationRequestWriteSerializer
