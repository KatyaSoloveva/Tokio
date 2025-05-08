from rest_framework import viewsets
from django.contrib.auth import get_user_model

from .serializers import (CategorySerializer, CollaborationRequestSerializer,
                          TaskSerializer)
from tasks.models import Category, CollaborationRequest, Task


User = get_user_model()


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer

    def get_queryset(self):
        return Task.objects.filter(author=self.request.user)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CollaborationRequestViewSet(viewsets.ModelViewSet):
    queryset = CollaborationRequest.objects.all()
    serializer_class = CollaborationRequestSerializer
