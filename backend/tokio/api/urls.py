from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import TaskViewSet, UserViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='tasks')
router.register(r'users', UserViewSet, basename='users')


urlpatterns = [
    path('', include(router.urls)),
    path(r'auth/', include('djoser.urls.authtoken')),
]
