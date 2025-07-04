from rest_framework.routers import DefaultRouter
from .views import RegistroSiembraViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'', RegistroSiembraViewSet, basename='registro_siembra')

urlpatterns = [
    path('', include(router.urls)),
]
