from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from djoser.views import UserViewSet

from .serializers import TaskSerializer
from tasks.models import Task


User = get_user_model()


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class UserViewSet(UserViewSet):

    @action(methods=('get',), detail=False, url_path='me/tasks')
    def tasks(self, request):
        tasks = request.user.tasks_author.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
