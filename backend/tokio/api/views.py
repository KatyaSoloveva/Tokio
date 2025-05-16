from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from django.db.models import Q

from .serializers import (CategorySerializer,
                          CollaborationResponseSerializer,
                          CollaborationRequestReadSerializer,
                          CollaborationRequestWriteSerializer,
                          FriendShipRequestSerializer,
                          TaskWriteSerializer, TaskReadSerializer)
from tasks.models import Category, CollaborationRequest, Task
from users.models import FriendShipRequest
from .permissions import IsSenderOrReadOnly, IsReceiverOnly


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


class BaseRequestViewSet(mixins.CreateModelMixin,
                         mixins.RetrieveModelMixin,
                         mixins.DestroyModelMixin,
                         viewsets.GenericViewSet):
    serializer_read_class = None
    serializer_write_class = None
    serializer_response_class = None
    request_model = None
    permission_classes = (IsSenderOrReadOnly,)

    def get_queryset(self):
        user = self.request.user
        return self.get_optimized_queryset(self.request_model.objects.filter(
            Q(sender=user) | Q(receiver=user)
        ))

    def get_serializer_class(self):
        return (self.serializer_write_class if self.action == 'create'
                else self.serializer_read_class)

    def get_optimized_queryset(self, queryset):
        return queryset.select_related('receiver', 'sender').only(
            'id', 'status', 'request_date',
            'sender__username', 'receiver__username'
        )

    def get_requests_type(self, filter_condition):
        requests = self.get_optimized_queryset(
            self.request_model.objects.filter(**filter_condition)
        )
        serializer = self.get_serializer(requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=('get',))
    def sent(self, request):
        return self.get_requests_type({'sender': request.user})

    @action(detail=False, methods=('get',))
    def received(self, request):
        return self.get_requests_type({'receiver': request.user})

    @action(detail=True, methods=('post',),
            permission_classes=(IsReceiverOnly,))
    def respond(self, request, pk=None):
        current_request = self.get_object()
        serializer = self.serializer_response_class(
            data=request.data, instance=current_request
        )
        serializer.is_valid(raise_exception=True)
        if (serializer.validated_data['action'] ==
                self.request_model.Status.ACCEPTED):
            current_request.accept()
        else:
            current_request.reject()
        return Response(
            self.serializer_read_class(current_request).data,
            status=status.HTTP_200_OK
        )


class CollaborationRequestViewSet(BaseRequestViewSet):
    serializer_read_class = CollaborationRequestReadSerializer
    serializer_write_class = CollaborationRequestWriteSerializer
    serializer_response_class = CollaborationResponseSerializer
    request_model = CollaborationRequest

    def get_optimized_queryset(self, queryset):
        queryset = super().get_optimized_queryset(queryset)
        return queryset.select_related('task').only(
            'id', 'status', 'request_date', 'sender__username',
            'receiver__username', 'task__name'
        )


class FriendShipRequestViewSet(viewsets.ModelViewSet):
    queryset = FriendShipRequest.objects.all()
    serializer_class = FriendShipRequestSerializer
