from rest_framework import serializers
from .models import Usuario
from django.contrib.auth.hashers import make_password

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

    def validate_correo(self, value):
        if Usuario.objects.filter(correo=value).exists():
            raise serializers.ValidationError("Este correo ya está registrado.")
        return value

    def validate_cedula(self, value):
        if not value.isdigit() or len(value) != 10:
            raise serializers.ValidationError("La cédula debe tener exactamente 10 dígitos.")
        return value

    def validate_rol(self, value):
        if value.lower() not in ['admin', 'tecnico', 'agricultor']:
            raise serializers.ValidationError("El rol debe ser 'admin', 'tecnico' o 'agricultor'.")
        return value
    
    def create(self, validated_data):
        validated_data['contraseña'] = make_password(validated_data['contraseña'])
        return super().create(validated_data)