from rest_framework.routers import DefaultRouter
from .views import PlanificacionTratamientoViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'tratamientos', PlanificacionTratamientoViewSet, basename='tratamientos')

urlpatterns = [
    path('', include(router.urls)),
]
