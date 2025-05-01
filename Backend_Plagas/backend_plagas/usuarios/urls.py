from rest_framework import routers
from .views import UsuarioViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
