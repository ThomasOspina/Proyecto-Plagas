from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ApiPlagasViewSet, guardar_diagnostico_crophealth

router = DefaultRouter()
router.register(r'items', ApiPlagasViewSet)  # API REST convencional

urlpatterns = [
    path('', include(router.urls)),
    path('guardar-diagnostico/', guardar_diagnostico_crophealth, name='guardar_diagnostico_crophealth'),
]

