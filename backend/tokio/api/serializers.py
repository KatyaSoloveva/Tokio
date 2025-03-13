from rest_framework import serializers
from djoser.serializers import UserSerializer

from tasks.models import Task


class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = '__all__'


class UserSerializer(serializers):

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ('first_name',
                                               'last_name', 'birthday')
# потом добавить поля - avatar, issubscribed
