from rest_framework import permissions


class IsSenderOrReadOnly(permissions.BasePermission):
    """
    Кастомный класс-разрешение.

    Позволяет вносить измнение в объект только пользователям-отправителям,
    остальным дан доступ только на чтение.
    """

    def has_object_permission(self, request, view, obj):
        return (request.method in permissions.SAFE_METHODS
                or obj.sender == request.user)


class IsReceiverOnly(permissions.BasePermission):
    """
    Кастомный класс-разрешение.

    Позволяет иметь доступ к объекту только пользователям-получателям запроса.
    """

    def has_object_permission(self, request, view, obj):
        return obj.receiver == request.user


class IsAuthorOrCollaborator(permissions.BasePermission):
    """
    Кастомный класс-разрешение.

    Позволяет иметь доступ к объекту только авторам объекта или его
    коллабораторам.
    """

    def has_object_permission(self, request, view, obj):
        return (obj.author == request.user
                or request.user in obj.collaborators.all())


class IsAuthorOnly(permissions.BasePermission):
    """
    Кастомный класс-разрешение.

    Позволяет имметь доступ к объекту только авторам объекта.
    """

    def has_object_permission(self, request, view, obj):
        return obj.author == request.user
