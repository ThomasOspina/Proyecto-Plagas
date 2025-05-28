from rest_framework import serializers
from .models import RegistroSiembra

class RegistroSiembraSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroSiembra
        fields = '__all__'

    def validate_cantidad_plantas(self, value):
        if value <= 0:
            raise serializers.ValidationError("La cantidad de plantas debe ser mayor a cero.")
        return value

    def validate_tipo_planta(self, value):
        if not value.strip():
            raise serializers.ValidationError("El tipo de planta no puede estar vacío.")
        return value

