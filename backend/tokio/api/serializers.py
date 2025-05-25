from rest_framework import serializers
from djoser.serializers import UserSerializer as DjoserUserSerializer
from django.core.exceptions import ValidationError

from tasks.models import Category, CollaborationRequest, Task
from users.models import FriendShipRequest
from core.base_models import BaseRequestModel


class FriendSerializer(DjoserUserSerializer):
    class Meta(DjoserUserSerializer.Meta):
        fields = DjoserUserSerializer.Meta.fields + (
            'first_name', 'last_name', 'birthday',
        )


class UserSerializer(FriendSerializer):
    friends = FriendSerializer(many=True, read_only=True)

    class Meta(FriendSerializer.Meta):
        fields = FriendSerializer.Meta.fields + ('friends',)


class CategorySerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Category
        fields = '__all__'


class TaskWriteSerializer(serializers.ModelSerializer):
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
    author = UserSerializer(read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    collaborators = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = '__all__'


class BaseRequestReadSerializer(serializers.ModelSerializer):
    receiver = serializers.CharField(source='receiver.username')
    sender = serializers.CharField(source='sender.username')


class BaseRequestWriteSerializer(serializers.ModelSerializer):
    sender = serializers.HiddenField(default=serializers.CurrentUserDefault())

    def validate(self, attrs):
        model = self.Meta.model
        if attrs['sender'] == attrs['receiver']:
            raise ValidationError(
                f'Нельзя отправить {model._meta.verbose_name} самому себе!'
            )
        return attrs


class BaseResponseSerializer(serializers.Serializer):
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
    task = serializers.CharField(source='task.name')

    class Meta:
        model = CollaborationRequest
        fields = '__all__'


class CollaborationRequestWriteSerializer(BaseRequestWriteSerializer):

    class Meta:
        model = CollaborationRequest
        fields = '__all__'

    def validate(self, attrs):
        super().validate(attrs)
        if attrs['sender'] != attrs['task'].sender:
            raise ValidationError(
                'Нельзя пригласить коллаборатора не в свою заметку!'
            )
        return attrs

    def to_representation(self, instance):
        return CollaborationRequestReadSerializer(instance=instance).data


class FriendshipRequestReadSerializer(BaseRequestReadSerializer):

    class Meta:
        model = FriendShipRequest
        fields = '__all__'


class FriendshipRequestWriteSerializer(BaseRequestWriteSerializer):

    class Meta:
        model = FriendShipRequest
        fields = '__all__'

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
