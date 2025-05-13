from rest_framework import viewsets, mixins
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
from .permissions import IsAuthorOrReadOnly


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


class CollaborationRequestViewSet(mixins.CreateModelMixin,
                                  mixins.RetrieveModelMixin,
                                  mixins.DestroyModelMixin,
                                  mixins.ListModelMixin,
                                  viewsets.GenericViewSet):
    permission_classes = (IsAuthorOrReadOnly,)

    def get_queryset(self):
        user = self.request.user
        return self.get_optimized_queryset(CollaborationRequest.objects.filter(
            Q(author=user) | Q(collaborator=user)
        ))

    def get_serializer_class(self):
        if self.action in ('list', 'retrieve'):
            return CollaborationRequestReadSerializer
        elif self.action in ('create'):
            return CollaborationRequestWriteSerializer

    def get_optimized_queryset(self, queryset):
        return queryset.select_related('task', 'collaborator', 'author').only(
            'id', 'status', 'request_date', 'task__name',
            'author__username', 'collaborator__username'
        )

    def get_requests_type(self, filter_condition):
        requests = self.get_optimized_queryset(
            CollaborationRequest.objects.filter(**filter_condition)
        )
        serializer = CollaborationRequestReadSerializer(requests,
                                                        many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=('get',))
    def sent(self, request):
        return self.get_requests_type({'author': request.user})

    @action(detail=False, methods=('get',))
    def received(self, request):
        return self.get_requests_type({'collaborator': request.user})
