from rest_framework import routers
from .views import GestionLoteViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'', GestionLoteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
