from rest_framework import routers
from .views import RegistroSiembraViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'', RegistroSiembraViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
