from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from djoser.serializers import UserSerializer

from tasks.models import Task


class TaskSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Task
        fields = '__all__'
        validators = [
            UniqueTogetherValidator(
                queryset=Task.objects.all(),
                fields=('author', 'name'),
                message='Заметка с таким названием уже существует!',
            )
        ]


class UserSerializer(UserSerializer):

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ('first_name',
                                               'last_name', 'birthday')

# потом добавить поля - avatar, issubscribed
