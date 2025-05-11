from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import CategoryViewSet, CollaborationRequestViewSet, TaskViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet,
                basename='tasks')
router.register(r'categories', CategoryViewSet,
                basename='categories')
router.register(r'collaborations', CollaborationRequestViewSet,
                basename='collaborations')


urlpatterns = [
    path('', include(router.urls)),
    path(r'', include('djoser.urls')),
    path(r'auth/', include('djoser.urls.authtoken')),
]
