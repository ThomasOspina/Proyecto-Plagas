from rest_framework import viewsets
from .models import ReporteFotos
from .serializers import ReporteFotosSerializer

class ReporteFotosViewSet(viewsets.ModelViewSet):
    queryset = ReporteFotos.objects.all()
    serializer_class = ReporteFotosSerializer

