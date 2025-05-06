from rest_framework.routers import DefaultRouter
from .views import MonitoreoPlagasViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'monitoreo', MonitoreoPlagasViewSet, basename='monitoreo')

urlpatterns = [
    path('', include(router.urls)),
]
