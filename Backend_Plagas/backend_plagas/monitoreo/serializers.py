from rest_framework import serializers
from .models import MonitoreoPlagas

class MonitoreoPlagasSerializer(serializers.ModelSerializer): 
    class Meta:
        model = MonitoreoPlagas
        fields = '__all__'

    def validate_reporte(self, value):
        if len(value.strip()) < 5:
            raise serializers.ValidationError("El campo reporte debe tener al menos 5 caracteres.")
        return value

    def validate_observacionAnomalia(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError("La observación debe tener al menos 10 caracteres.")
        return value

