from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet
from django.urls import path, include
from .views import login_usuario
from rest_framework_simplejwt.views import TokenRefreshView


router = DefaultRouter()
router.register(r'', UsuarioViewSet, basename='usuario')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_usuario, name='login_usuario'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
