from rest_framework import routers
from .views import PlanificacionTratamientoViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'', PlanificacionTratamientoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
