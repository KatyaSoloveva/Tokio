from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
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
        return Task.objects.filter(author=self.request.user).select_related(
            'author'
        ).prefetch_related('categories', 'collaborators')

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
        ).select_related('task', 'collaborator', 'author').only(
            'id', 'status', 'request_date', 'task__name', 'author__username',
            'collaborator__username'
        )

    def get_serializer_class(self):
        if self.action in ('list', 'retrieve'):
            return CollaborationRequestReadSerializer
        elif self.action in ('create', 'destroy'):
            return CollaborationRequestWriteSerializer

    @action(detail=False, methods=('get',))
    def sent(self, request):
        sent_requests = CollaborationRequest.objects.filter(
            author=request.user
        ).select_related('task', 'collaborator', 'author').only(
            'id', 'status', 'request_date', 'task__name', 'author__username',
            'collaborator__username'
        )
        serializer = CollaborationRequestReadSerializer(sent_requests,
                                                        many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=('get',))
    def received(self, request):
        received_requests = CollaborationRequest.objects.filter(
            collaborator=request.user
        ).select_related('task', 'collaborator', 'author').only(
            'id', 'status', 'request_date', 'task__name', 'author__username',
            'collaborator__username'
        )
        serializer = CollaborationRequestReadSerializer(received_requests,
                                                        many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
