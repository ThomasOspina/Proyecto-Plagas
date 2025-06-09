from rest_framework.routers import DefaultRouter
from .views import MonitoreoPlagasViewSet
from django.urls import path, include
from .views import crear_monitoreo_con_foto

router = DefaultRouter()
router.register(r'', MonitoreoPlagasViewSet, basename='monitoreo')

urlpatterns = [
    path('crear-monitoreo-con-foto/', crear_monitoreo_con_foto, name='crear_monitoreo_con_foto'),
    path('', include(router.urls)),
]
