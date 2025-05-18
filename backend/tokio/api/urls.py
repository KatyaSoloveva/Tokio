from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (CategoryViewSet, CollaborationRequestViewSet,
                    FriendShipRequestViewSet, TaskViewSet, UserViewSet)

router = DefaultRouter()
router.register(r'tasks', TaskViewSet,
                basename='tasks')
router.register(r'categories', CategoryViewSet,
                basename='categories')
router.register(r'collaborations', CollaborationRequestViewSet,
                basename='collaborations')
router.register(r'friendship', FriendShipRequestViewSet,
                basename='friendship')
router.register(r'users', UserViewSet, basename='users')

urlpatterns = [
    path('', include(router.urls)),
    path(r'auth/', include('djoser.urls.authtoken')),
]
