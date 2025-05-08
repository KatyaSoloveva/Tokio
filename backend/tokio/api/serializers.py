from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from djoser.serializers import UserSerializer

from tasks.models import Category, CollaborationRequest, Task


class UserSerializer(UserSerializer):

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ('first_name',
                                               'last_name', 'birthday')

# потом добавить поля - avatar, issubscribed


class CategorySerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Category
        fields = '__all__'


class TaskWriteSerializer(serializers.ModelSerializer):
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

    def create(self, validated_data):
        categories = validated_data.pop('categories')
        collaborators = validated_data.pop('collaborators')
        instance = Task.objects.create(**validated_data)
        instance.categories.set(categories)
        instance.collaborators.set(collaborators)
        return instance


class TaskReadSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    collaborators = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = '__all__'


class CollaborationRequestSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = CollaborationRequest
        fields = '__all__'
