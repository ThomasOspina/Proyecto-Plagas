from rest_framework import viewsets
from .models import ReporteFotos
from .serializers import ReporteFotosSerializer
from rest_framework.permissions import AllowAny


class ReporteFotosViewSet(viewsets.ModelViewSet):
    queryset = ReporteFotos.objects.all()
    serializer_class = ReporteFotosSerializer
    permission_classes = [AllowAny]

