from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ApiPlagasViewSet, guardar_diagnostico_crophealth

router = DefaultRouter()
router.register(r'plagas', ApiPlagasViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Esto queda como /api/api-plagas/plagas/
    path('guardar-diagnostico/', guardar_diagnostico_crophealth, name='guardar_diagnostico_crophealth'),
]

