from rest_framework import viewsets
from .models import RegistroSiembra
from .serializers import RegistroSiembraSerializer

class RegistroSiembraViewSet(viewsets.ModelViewSet):
    queryset = RegistroSiembra.objects.all()
    serializer_class = RegistroSiembraSerializer

