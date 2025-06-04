from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        rol = validated_data.get('rol', '').lower()
        password = validated_data.get('password')

        if rol != 'campesino' and not password:
            raise serializers.ValidationError({'password': 'Este campo es obligatorio para usuarios que no son campesinos.'})

        if password:
            validated_data['password'] = make_password(password)

        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'password' in validated_data and validated_data['password']:
            validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance, validated_data)




