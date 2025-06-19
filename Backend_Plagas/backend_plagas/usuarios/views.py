from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password
from usuarios.models import Usuario
from usuarios.serializers import UsuarioSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes

class UsuarioViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated] 
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def login_usuario(request):
    cedula = request.data.get('cedula')
    password = request.data.get('password')  # Puede ser None

    if not cedula:
        return Response({'error': 'Debe proporcionar cédula'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        usuario = Usuario.objects.get(cedula=cedula)

        if usuario.rol.lower() == 'campesino':
            # Login sin contraseña permitido
            refresh = RefreshToken.for_user(usuario)
            return Response({
                'mensaje': 'Login exitoso como campesino',
                'id_usuario': usuario.id_usuario,
                'rol': usuario.rol,
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }, status=status.HTTP_200_OK)

        # Si no es campesino, necesita validar contraseña
        if not password:
            return Response({'error': 'Debe proporcionar contraseña'}, status=status.HTTP_400_BAD_REQUEST)

        if check_password(password, usuario.password):
            refresh = RefreshToken.for_user(usuario)
            return Response({
                'mensaje': f'Login exitoso como {usuario.rol}',
                'id_usuario': usuario.id_usuario,
                'rol': usuario.rol,
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }, status=status.HTTP_200_OK)

        return Response({'error': 'Credenciales incorrectas'}, status=status.HTTP_401_UNAUTHORIZED)

    except Usuario.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    

@api_view(['DELETE'])
@permission_classes([AllowAny])
def eliminar_usuario_por_cedula(request, cedula):
    try:
        usuario = Usuario.objects.get(cedula=cedula)
        usuario.delete()
        return Response({'mensaje': 'Usuario eliminado correctamente'}, status=status.HTTP_200_OK)
    except Usuario.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)    

@api_view(['GET'])
@permission_classes([AllowAny])
def obtener_usuarios_publicos(request):
    usuarios = Usuario.objects.all()
    serializer = UsuarioSerializer(usuarios, many=True)
    return Response(serializer.data)


class RegistroUsuarioView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([AllowAny])
def actualizar_usuario_publico(request, id):
    try:
        usuario = Usuario.objects.get(pk=id)
    except Usuario.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    serializer = UsuarioSerializer(usuario, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({'mensaje': 'Usuario actualizado correctamente', 'usuario': serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)