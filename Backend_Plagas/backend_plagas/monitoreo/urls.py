from rest_framework import routers
from .views import MonitoreoPlagasViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'', MonitoreoPlagasViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
