import requests
import logging
from pathlib import Path
from django.conf import settings
import base64
import os

logger = logging.getLogger(__name__)

CROPHEALTH_URL = settings.CROPHEALTH_API_URL
API_KEY = settings.CROPHEALTH_API_KEY  # Mueve la clave a settings

def obtener_ruta_imagen(imagen_path):
    import os
    from django.conf import settings

    # 🔍 Verifica el path recibido
    print(f"DEBUG - Ruta recibida: {imagen_path}")

    # Une con MEDIA_ROOT si es una ruta relativa
    if not imagen_path.startswith(settings.MEDIA_ROOT):
        imagen_path = os.path.join(settings.MEDIA_ROOT, imagen_path)

    # 🔍 Verifica la ruta absoluta generada
    print(f"DEBUG - Ruta absoluta final: {imagen_path}")

    if not os.path.exists(imagen_path):
        print(f"❌ Archivo no encontrado: {imagen_path}")
        return None

    print("✅ Archivo encontrado")
    return imagen_path


def analizar_imagen_crophealth(imagen_path):
    full_path = obtener_ruta_imagen(imagen_path)
    if not full_path:
        return None

    with open(full_path, 'rb') as image_file:
        encoded_image = base64.b64encode(image_file.read()).decode('utf-8')

    payload = {'images': [encoded_image]}

    headers = {
        'Api-Key': API_KEY,
        'Content-Type': 'application/json'
    }

    try:
        response = requests.post(
            CROPHEALTH_URL,
            json=payload,
            headers=headers
        )
        response.raise_for_status()

        try:
            return response.json()
        except ValueError:
            print("❌ Respuesta de Kindwise no es JSON")
            return {'error': 'Respuesta no válida de la API externa'}


    except requests.exceptions.HTTPError as e:
        if response.status_code == 429:
            print("⚠️ Límite de peticiones alcanzado. Espera antes de volver a intentar.")
        elif response.status_code == 502:
            print("❌ Kindwise devolvió un Bad Gateway (502)")
        else:
            print(f"❌ Error HTTP: {e}")
        return {'error': 'Respuesta inesperada de la API externa'}

    except requests.exceptions.RequestException as e:
        print(f"Error al comunicarse con la API de Kindwise: {e}")
        return None




