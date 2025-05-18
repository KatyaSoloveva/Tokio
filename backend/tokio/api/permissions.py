from rest_framework import permissions


class IsSenderOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return (request.method in permissions.SAFE_METHODS
                or obj.sender == request.user)


class IsReceiverOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.receiver == request.user


class IsAuthorOrCollaborator(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return (obj.author == request.user
                or request.user in obj.collaborators.all())


class IsAuthorOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.author == request.user
