from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework import filters
from django.contrib.auth import get_user_model
from django.db.models import Q
from django.shortcuts import get_object_or_404
from djoser.views import UserViewSet
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import (BaseResponseSerializer, CategorySerializer,
                          CollaborationRequestReadSerializer,
                          CollaborationRequestWriteSerializer,
                          FriendshipRequestReadSerializer,
                          FriendshipRequestWriteSerializer,
                          FriendSerializer,
                          TaskWriteSerializer, TaskReadSerializer)
from tasks.models import Category, CollaborationRequest, Task
from users.models import FriendShipRequest
from .permissions import (IsAuthorOrCollaborator, IsAuthorOnly,
                          IsSenderOrReadOnly, IsReceiverOnly,)
from .pagination import RequestPagination, TaskPagination, UserPagination

User = get_user_model()


class UserViewSet(UserViewSet):
    pagination_class = UserPagination

    @action(detail=False, methods=('get',), url_path='me/friends')
    def friends(self, request):
        user = request.user
        friends = user.friends.all().order_by('username')
        page = self.paginate_queryset(friends)
        serializer = FriendSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    @action(detail=False, methods=('delete',),
            url_path=r'me/delete_friend/(?P<user_id>\d+)')
    def delete_friend(self, request, user_id=None):
        user = request.user
        friend = get_object_or_404(User, id=user_id)
        if friend not in user.friends.all():
            return Response(
                {'error': 'Пользователь не является вашим другом!'},
                status=status.HTTP_400_BAD_REQUEST
            )
        user.friends.remove(friend)
        return Response(status=status.HTTP_204_NO_CONTENT)


class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthorOrCollaborator,)
    pagination_class = TaskPagination
    filter_backends = (filters.SearchFilter,)
    search_fields = ('^name',)

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(
            Q(author=user) | Q(collaborators=user)
        ).select_related('author').prefetch_related(
            'categories', 'collaborators'
        )

    def get_serializer_class(self):
        if self.action in ('list', 'retrieve'):
            return TaskReadSerializer
        return TaskWriteSerializer

    @action(detail=True, methods=('delete',),
            url_path=r'delete_collaborator/(?P<user_id>\d+)',
            permission_classes=(IsAuthorOnly,))
    def delete_collaborator(self, request, pk=None, user_id=None):
        task = self.get_object()
        collaborator = get_object_or_404(User, id=user_id)
        if collaborator not in task.collaborators.all():
            return Response(
                {'error': 'Пользователь не является коллаборатором!'},
                status=status.HTTP_400_BAD_REQUEST
            )
        task.collaborators.remove(collaborator)
        return Response(status=status.HTTP_204_NO_CONTENT)


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
    request_model = None
    permission_classes = (IsSenderOrReadOnly,)
    pagination_class = RequestPagination
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('status',)

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
        requests = self.filter_queryset(self.get_optimized_queryset(
            self.request_model.objects.filter(**filter_condition)
        ))
        self.paginate_queryset(requests)
        serializer = self.get_serializer(requests, many=True)
        return self.get_paginated_response(serializer.data)

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
        serializer = BaseResponseSerializer(
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
    request_model = CollaborationRequest

    def get_optimized_queryset(self, queryset):
        queryset = super().get_optimized_queryset(queryset)
        return queryset.select_related('task').only(
            'id', 'status', 'request_date', 'sender__username',
            'receiver__username', 'task__name'
        )


class FriendShipRequestViewSet(BaseRequestViewSet):
    serializer_read_class = FriendshipRequestReadSerializer
    serializer_write_class = FriendshipRequestWriteSerializer
    request_model = FriendShipRequest
