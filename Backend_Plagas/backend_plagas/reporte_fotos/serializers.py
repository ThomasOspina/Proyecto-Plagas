from rest_framework import serializers
from .models import ReporteFotos

class ReporteFotosSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReporteFotos
        fields = '__all__'

    def validate_foto(self, value):
        # Validar tamaño (máximo 5 MB)
        max_size_mb = 5
        if value.size > max_size_mb * 1024 * 1024:
            raise serializers.ValidationError(f"La imagen no debe superar los {max_size_mb} MB.")

        # Validar extensión del archivo
        valid_extensions = ['.jpg', '.jpeg', '.png']
        import os
        ext = os.path.splitext(value.name)[1].lower()
        if ext not in valid_extensions:
            raise serializers.ValidationError("Formato de imagen no permitido. Usa JPG o PNG.")
        
        return value


