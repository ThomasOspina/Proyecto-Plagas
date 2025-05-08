from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'', UsuarioViewSet, basename='usuario')

urlpatterns = [
    path('', include(router.urls)),
]