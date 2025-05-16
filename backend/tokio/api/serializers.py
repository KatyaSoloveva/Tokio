from rest_framework import serializers
from djoser.serializers import UserSerializer
from django.core.exceptions import ValidationError

from tasks.models import Category, CollaborationRequest, Task
from users.models import FriendShipRequest


class UserSerializer(UserSerializer):

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + (
            'first_name', 'last_name', 'birthday', 'friends'
        )


class FriendShipRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendShipRequest
        fields = '__all__'


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

    def create(self, validated_data):
        categories = validated_data.pop('categories', [])
        collaborators = validated_data.pop('collaborators', [])
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


class CollaborationRequestReadSerializer(serializers.ModelSerializer):
    task = serializers.CharField(source='task.name')
    receiver = serializers.CharField(source='receiver.username')
    sender = serializers.CharField(source='sender.username')

    class Meta:
        model = CollaborationRequest
        fields = '__all__'


class CollaborationRequestWriteSerializer(serializers.ModelSerializer):
    sender = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = CollaborationRequest
        fields = '__all__'

    def validate(self, attrs):
        if attrs['sender'] != attrs['task'].sender:
            raise ValidationError(
                'Нельзя пригласить коллаборатора не в свою заметку!'
            )
        elif attrs['sender'] == attrs['receiver']:
            raise ValidationError(
                'Нельзя отправить запрос на коллаборацию самому себе!'
            )
        return attrs

    def to_representation(self, instance):
        return CollaborationRequestReadSerializer(instance=instance).data


class CollaborationResponseSerializer(serializers.Serializer):
    action = serializers.ChoiceField(choices=(
        CollaborationRequest.Status.ACCEPTED,
        CollaborationRequest.Status.REJECTED
    ))

    def validate(self, attrs):
        if self.instance.status != CollaborationRequest.Status.PENDING:
            raise ValidationError(
                'Вы уже ответили на этот запрос!'
            )
        return attrs
