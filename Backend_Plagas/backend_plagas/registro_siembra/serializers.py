from rest_framework import serializers
from .models import RegistroSiembra

class RegistroSiembraSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroSiembra
        fields = '__all__'
