from rest_framework import viewsets
from .models import MonitoreoPlagas
from .serializers import MonitoreoPlagasSerializer

class MonitoreoPlagasViewSet(viewsets.ModelViewSet):
    queryset = MonitoreoPlagas.objects.all()
    serializer_class = MonitoreoPlagasSerializer

