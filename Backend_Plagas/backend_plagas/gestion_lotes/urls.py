from rest_framework.routers import DefaultRouter
from .views import GestionLoteViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'', GestionLoteViewSet, basename='gestion_lote')

urlpatterns = [
    path('', include(router.urls)),
]

