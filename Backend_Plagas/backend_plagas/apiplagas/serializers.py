from rest_framework import serializers
from .models import ApiPlagas

class ApiPlagasSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApiPlagas
        fields = '__all__'
