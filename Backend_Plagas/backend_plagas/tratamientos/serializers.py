from rest_framework import serializers
from .models import PlanificacionTratamiento

class PlanificacionTratamientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanificacionTratamiento
        fields = '__all__'

        def validate(self, data):
            if data['fecha_fin'] < data['fecha_inicio']:
                raise serializers.ValidationError("La fecha de fin no puede ser anterior a la fecha de inicio.")
            return data
