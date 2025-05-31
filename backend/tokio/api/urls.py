from django.urls import include, path
from rest_framework.routers import DefaultRouter
from drf_spectacular.views import (
    SpectacularSwaggerView,
    SpectacularAPIView,
    SpectacularRedocView
)

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
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('docs/swagger/',
         SpectacularSwaggerView.as_view(url_name='schema'), name='swagger'),
    path('docs/redoc/',
         SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
