from rest_framework import viewsets
from .models import PlanificacionTratamiento
from .serializers import PlanificacionTratamientoSerializer

class PlanificacionTratamientoViewSet(viewsets.ModelViewSet):
    queryset = PlanificacionTratamiento.objects.all()
    serializer_class = PlanificacionTratamientoSerializer

