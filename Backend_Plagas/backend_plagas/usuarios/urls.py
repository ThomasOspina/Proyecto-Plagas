from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, login_usuario, RegistroUsuarioView
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from .views import eliminar_usuario_por_cedula
from .views import obtener_usuarios_publicos
from .views import actualizar_usuario_publico


router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuario')


urlpatterns = [
    path('registro/', RegistroUsuarioView.as_view(), name='registro_usuario'),
    path('login/', login_usuario, name='login_usuario'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('eliminar/<str:cedula>/', eliminar_usuario_por_cedula, name='eliminar_usuario'),
    path('public/', obtener_usuarios_publicos, name='usuarios_publicos'),
    path('publico/<int:id>/', actualizar_usuario_publico, name='actualizar_usuario_publico'),
    path('', include(router.urls)),
]


