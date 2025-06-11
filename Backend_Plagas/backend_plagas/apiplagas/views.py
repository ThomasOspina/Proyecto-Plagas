from rest_framework import viewsets
from .models import ApiPlagas
from .serializers import ApiPlagasSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .crophealth_service import analizar_imagen_crophealth
from reporte_fotos.models import ReporteFotos
import os
from django.conf import settings
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny


class ApiPlagasViewSet(viewsets.ModelViewSet):
    queryset = ApiPlagas.objects.all()
    serializer_class = ApiPlagasSerializer
    permission_classes = [AllowAny]


@api_view(['POST'])
@permission_classes([AllowAny])
def guardar_diagnostico_crophealth(request):
    reporte_id = request.data.get('reporteFotos')  # ID del reporte desde el cuerpo del POST

    if not reporte_id:
        return Response({'error': 'Debe proporcionar el ID del reporte'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        reporte = ReporteFotos.objects.get(id_reporteFotos=reporte_id)
        imagen_path = str(reporte.foto)
    except ReporteFotos.DoesNotExist:
        return Response({'error': 'Reporte no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    # Verificación del path de imagen
    ruta_absoluta = os.path.join(settings.MEDIA_ROOT, imagen_path)
    if not os.path.exists(ruta_absoluta):
        return Response({'error': 'Imagen no encontrada en el sistema de archivos'}, status=status.HTTP_404_NOT_FOUND)

    data = analizar_imagen_crophealth(imagen_path)

    if data is None:
        return Response({'error': 'No se pudo comunicar con la API externa'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

    if 'result' not in data:
        return Response({'error': 'Respuesta inesperada de la API externa'}, status=status.HTTP_502_BAD_GATEWAY)

    result = data['result']
    if 'crop' not in result or 'disease' not in result:
        return Response({'error': 'Faltan datos de cultivo o enfermedad en la respuesta'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    crop_suggestions = result['crop'].get('suggestions', [])
    disease_suggestions = result['disease'].get('suggestions', [])

    if not crop_suggestions or not disease_suggestions:
        return Response({'error': 'No se encontraron sugerencias válidas'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    try:
        crop = crop_suggestions[0]
        disease = disease_suggestions[0]

        api_result = ApiPlagas.objects.create(
            nombrePlanta=crop.get('name', 'Desconocido'),
            nombreCientificoPlanta=crop.get('scientific_name', 'Desconocido'),
            enfermedadPlanta=disease.get('name', 'Desconocido'),
            nombreCientificoEnfermedad=disease.get('scientific_name', 'Desconocido'),
            reporteFotos=reporte
        )

        return Response({
            'id_api': api_result.id_api,
            'planta': api_result.nombrePlanta,
            'planta_nombre_cientifico': api_result.nombreCientificoPlanta,
            'enfermedad': api_result.enfermedadPlanta,
            'enfermedad_nombre_cientifico': api_result.nombreCientificoEnfermedad
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




