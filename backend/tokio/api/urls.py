from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import CategoryViewSet, TaskViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='tasks')
router.register(r'categories', CategoryViewSet, basename='categories')


urlpatterns = [
    path('', include(router.urls)),
    path(r'', include('djoser.urls')),
    path(r'auth/', include('djoser.urls.authtoken')),
]
