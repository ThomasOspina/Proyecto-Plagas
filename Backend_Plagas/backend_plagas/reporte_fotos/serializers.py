from rest_framework import serializers
from .models import ReporteFotos

class ReporteFotosSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReporteFotos
        fields = '__all__'
