import requests
import logging
from pathlib import Path
from django.conf import settings

logger = logging.getLogger(__name__)

CROPHEALTH_URL = "https://crop.kindwise.com/api/v1"
API_KEY = settings.CROPHEALTH_API_KEY  # Mueve la clave a settings

def obtener_ruta_imagen(imagen_path):
    if not imagen_path.startswith(settings.MEDIA_URL):
        imagen_path = Path(settings.MEDIA_ROOT) / imagen_path

    if not imagen_path.exists():
        logger.warning(f"El archivo {imagen_path} no existe.")
        return None

    return str(imagen_path)

def analizar_imagen_crophealth(imagen_path):
    imagen_path_completa = obtener_ruta_imagen(imagen_path)
    
    if imagen_path_completa is None:
        return None

    try:
        with open(imagen_path_completa, 'rb') as img_file:
            files = {'image': img_file}
            headers = {'Api-Key': API_KEY}

            response = requests.post(CROPHEALTH_URL, headers=headers, files=files)
            response.raise_for_status()
            return response.json()

    except requests.exceptions.RequestException as e:
        logger.error(f"Excepción durante la solicitud a CropHealth: {e}")
        return None



