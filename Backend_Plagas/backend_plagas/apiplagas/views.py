from rest_framework import viewsets
from .models import ApiPlagas
from .serializers import ApiPlagasSerializer

from django.http import JsonResponse
from .crophealth_service import analizar_imagen_crophealth
from reporte_fotos.models import ReporteFotos


class ApiPlagasViewSet(viewsets.ModelViewSet):
    queryset = ApiPlagas.objects.all()
    serializer_class = ApiPlagasSerializer


# Vista personalizada para consumir Crop.health y guardar resultados
def guardar_diagnostico_crophealth(request):
    reporte_id = request.GET.get('reporte_id')  # También puedes usar request.POST si es un formulario

    if not reporte_id:
        return JsonResponse({'error': 'Debe proporcionar el ID del reporte'}, status=400)

    try:
        reporte = ReporteFotos.objects.get(id_reporteFotos=reporte_id)
        imagen_path = f'media/{reporte.foto}'  # Asegúrate de que el path sea correcto según tu configuración
    except ReporteFotos.DoesNotExist:
        return JsonResponse({'error': 'Reporte no encontrado'}, status=404)

    data = analizar_imagen_crophealth(imagen_path)

    if not data or 'result' not in data:
        return JsonResponse({'error': 'No se pudo procesar la imagen'}, status=400)

    try:
        crop_suggestions = data['result']['crop'].get('suggestions', [])
        disease_suggestions = data['result']['disease'].get('suggestions', [])

        if not crop_suggestions or not disease_suggestions:
            return JsonResponse({'error': 'No se encontraron sugerencias de cultivo o enfermedad'}, status=422)

        crop = crop_suggestions[0]
        disease = disease_suggestions[0]

        api_result = ApiPlagas.objects.create(
            nombrePlanta=crop.get('name', 'Desconocido'),
            nombreCientificoPlanta=crop.get('scientific_name', 'Desconocido'),
            enfermedadPlanta=disease.get('name', 'Desconocido'),
            nombreCientificoEnfermedad=disease.get('scientific_name', 'Desconocido'),
            reporteFotos=reporte
        )

        return JsonResponse({
            'id_api': api_result.id_api,
            'planta': api_result.nombrePlanta,
            'enfermedad': api_result.enfermedadPlanta
        })

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


