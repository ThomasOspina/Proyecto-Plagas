from rest_framework import routers
from .views import ReporteFotosViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'', ReporteFotosViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
