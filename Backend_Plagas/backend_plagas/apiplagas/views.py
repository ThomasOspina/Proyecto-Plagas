from rest_framework import viewsets
from .models import ApiPlagas
from .serializers import ApiPlagasSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.http import JsonResponse
from .crophealth_service import analizar_imagen_crophealth
from reporte_fotos.models import ReporteFotos


class ApiPlagasViewSet(viewsets.ModelViewSet):
    queryset = ApiPlagas.objects.all()
    serializer_class = ApiPlagasSerializer


@api_view(['POST'])
def guardar_diagnostico_crophealth(request):
    reporte_id = request.data.get('reporteFotos')  # Cambiado para que sea compatible con POST JSON o form-data

    if not reporte_id:
        return Response({'error': 'Debe proporcionar el ID del reporte'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        reporte = ReporteFotos.objects.get(id_reporteFotos=reporte_id)
        imagen_path = f'media/{reporte.foto}'  # Asegúrate de validar este path
    except ReporteFotos.DoesNotExist:
        return Response({'error': 'Reporte no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    data = analizar_imagen_crophealth(imagen_path)

    if not data or 'result' not in data:
        return Response({'error': 'No se pudo procesar la imagen'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        crop_suggestions = data['result']['crop'].get('suggestions', [])
        disease_suggestions = data['result']['disease'].get('suggestions', [])

        if not crop_suggestions or not disease_suggestions:
            return Response({'error': 'No se encontraron sugerencias válidas'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

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
            'enfermedad': api_result.enfermedadPlanta
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



