from rest_framework import viewsets
from .models import MonitoreoPlagas
from .serializers import MonitoreoPlagasSerializer
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status
from datetime import date
from reporte_fotos.models import ReporteFotos
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, parser_classes, permission_classes

class MonitoreoPlagasViewSet(viewsets.ModelViewSet):
    queryset = MonitoreoPlagas.objects.all()
    serializer_class = MonitoreoPlagasSerializer
    permission_classes = [AllowAny] 

@api_view(['POST'])
@permission_classes([AllowAny])
@parser_classes([MultiPartParser])
def crear_monitoreo_con_foto(request):
    try:
        registro_id = request.POST['registro']
        imagen = request.FILES['foto']

        monitoreo = MonitoreoPlagas.objects.create(
            fecha_monitoreo=date.today(),
            reporte='Reporte generado con imagen',
            observacionAnomalia='Posible anomalía detectada',
            registro_id=registro_id
        )

        ReporteFotos.objects.create(
            foto=imagen,
            monitoreo=monitoreo
        )

        return Response({'message': 'Monitoreo y foto registrados'}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
