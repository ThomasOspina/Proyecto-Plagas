from django.urls import path, include
from rest_framework import routers
from .views import ApiPlagasViewSet, guardar_diagnostico_crophealth

router = routers.DefaultRouter()
router.register(r'items', ApiPlagasViewSet)  # API REST convencional

urlpatterns = [
    path('', include(router.urls)),  # CRUD para ApiPlagas
    path('diagnostico/', guardar_diagnostico_crophealth),  # Vista personalizada
]

