from rest_framework import serializers
from djoser.serializers import UserSerializer as DjoserUserSerializer
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

from tasks.models import Category, CollaborationRequest, Task
from users.models import FriendShipRequest
from core.base_models import BaseRequestModel

User = get_user_model()


class FriendSerializer(serializers.ModelSerializer):
    """Сериализатор для представления информации о друзьях пользователя."""

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name',
                  'birthday', 'avatar')


class UserSerializer(DjoserUserSerializer):
    """Сериализатор для модели User."""

    class Meta(DjoserUserSerializer.Meta):
        fields = DjoserUserSerializer.Meta.fields + (
            'first_name', 'last_name', 'birthday', 'avatar',
        )


class CategorySerializer(serializers.ModelSerializer):
    """Сериализатор для модели Category."""

    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Category
        fields = '__all__'
        read_only_fields = ('is_system', 'slug')


class TaskWriteSerializer(serializers.ModelSerializer):
    """
    Сериализатор для модели Task.

    Отвечает за создание и обновление задачи.
    """

    author = serializers.HiddenField(default=serializers.CurrentUserDefault())
    collaborators = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = '__all__'

    def create(self, validated_data):
        categories = validated_data.pop('categories', [])
        instance = Task.objects.create(**validated_data)
        instance.categories.set(categories)
        return instance


class TaskReadSerializer(serializers.ModelSerializer):
    """
    Сериализатор для модели Task.

    Отвечает за отображение информации о задаче.
    """

    author = UserSerializer(read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    collaborators = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = '__all__'


class BaseRequestReadSerializer(serializers.ModelSerializer):
    """Базовый сериализатор для отображения информации о запросах."""

    receiver = serializers.CharField(source='receiver.username')
    sender = serializers.CharField(source='sender.username')


class BaseRequestWriteSerializer(serializers.ModelSerializer):
    """Базовый сериализатор для создания запроса."""

    sender = serializers.HiddenField(default=serializers.CurrentUserDefault())

    def validate(self, attrs):
        model = self.Meta.model
        if attrs['sender'] == attrs['receiver']:
            raise ValidationError(
                f'Нельзя отправить {model._meta.verbose_name} самому себе!'
            )
        return attrs

    class Meta:
        fields = '__all__'
        read_only_fields = ('status',)


class ResponseSerializer(serializers.Serializer):
    """Сериализатор для ответа на запрос."""

    action = serializers.ChoiceField(choices=(
        BaseRequestModel.Status.ACCEPTED,
        BaseRequestModel.Status.REJECTED
    ))

    def validate(self, attrs):
        if self.instance.status != BaseRequestModel.Status.PENDING:
            raise ValidationError(
                'Вы уже ответили на этот запрос!'
            )
        return attrs


class CollaborationRequestReadSerializer(BaseRequestReadSerializer):
    """Сериализатор для отображения информации о запросе на коллаборацию."""

    task = serializers.SerializerMethodField()

    class Meta:
        model = CollaborationRequest
        fields = '__all__'

    def get_task(self, obj):
        return {
            'id': obj.task.id,
            'name': obj.task.name
        }


class CollaborationRequestWriteSerializer(BaseRequestWriteSerializer):
    """Сериализатор для создания запроса на коллаборацию."""

    class Meta(BaseRequestWriteSerializer.Meta):
        model = CollaborationRequest

    def validate(self, attrs):
        super().validate(attrs)
        if attrs['sender'] != attrs['task'].author:
            raise ValidationError(
                'Нельзя пригласить коллаборатора не в свою заметку!'
            )
        return attrs

    def to_representation(self, instance):
        return CollaborationRequestReadSerializer(instance=instance).data


class FriendshipRequestReadSerializer(BaseRequestReadSerializer):
    """Сериализатор для отображения информации о запросе на дружбу."""

    class Meta:
        model = FriendShipRequest
        fields = '__all__'


class FriendshipRequestWriteSerializer(BaseRequestWriteSerializer):
    """Сериализатор для создания запроса на дружбу."""

    class Meta(BaseRequestWriteSerializer.Meta):
        model = FriendShipRequest

    def validate(self, attrs):
        super().validate(attrs)
        if FriendShipRequest.objects.filter(
            sender=attrs['receiver'], receiver=attrs['sender'], status__in=(
                'pending', 'accepted'
            )
        ).exists():
            raise ValidationError(
                'Заявка на дружбу с данными людьми уже существует!'
            )

        return attrs

    def to_representation(self, instance):
        return FriendshipRequestReadSerializer(instance=instance).data
