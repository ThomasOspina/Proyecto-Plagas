from rest_framework.routers import DefaultRouter
from .views import ReporteFotosViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'', ReporteFotosViewSet, basename='reporte_fotos')

urlpatterns = [
    path('', include(router.urls)),
]
