from rest_framework import serializers
from .models import GestionLote

class GestionLoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = GestionLote
        fields = '__all__'

