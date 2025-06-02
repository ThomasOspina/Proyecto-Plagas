from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password
from usuarios.models import Usuario
from usuarios.serializers import UsuarioSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated


class UsuarioViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated] 
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


@api_view(['POST'])
def login_usuario(request):
    cedula = request.data.get('cedula')
    contraseña = request.data.get('contraseña')

    if not cedula or not contraseña:
        return Response({'error': 'Debe proporcionar cédula y contraseña'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        usuario = Usuario.objects.get(cedula=cedula)

        if check_password(contraseña, usuario.contraseña):
            # ✅ Crear los tokens
            refresh = RefreshToken.for_user(usuario)

            return Response({
                'mensaje': f'Login exitoso como {usuario.rol}',
                'id_usuario': usuario.id_usuario,
                'rol': usuario.rol,
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }, status=status.HTTP_200_OK)

        else:
            return Response({'error': 'Credenciales incorrectas'}, status=status.HTTP_401_UNAUTHORIZED)

    except Usuario.DoesNotExist:
        return Response({'error': 'Credenciales incorrectas'}, status=status.HTTP_401_UNAUTHORIZED)

