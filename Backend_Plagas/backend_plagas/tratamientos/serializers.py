from rest_framework import serializers
from .models import PlanificacionTratamiento

class PlanificacionTratamientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanificacionTratamiento
        fields = '__all__'
