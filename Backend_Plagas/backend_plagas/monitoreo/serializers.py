from rest_framework import serializers
from .models import MonitoreoPlagas

class MonitoreoPlagasSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonitoreoPlagas
        fields = '__all__'
