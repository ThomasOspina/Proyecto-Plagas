from rest_framework import viewsets
from .models import GestionLote
from .serializers import GestionLoteSerializer

class GestionLoteViewSet(viewsets.ModelViewSet):
    queryset = GestionLote.objects.all()
    serializer_class = GestionLoteSerializer
