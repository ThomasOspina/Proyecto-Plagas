import os
import requests
from django.conf import settings

# URL y API Key para el servicio de CropHealth
CROPHEALTH_URL = "https://crop.kindwise.com/api/v1"
API_KEY = "n3deHtXofPgwCRjD2Z08zkl9DCxXIYQPPcQOqiH6AGWuyscyPN"  # Reemplaza esto por tu clave real

def obtener_ruta_imagen(imagen_path):
    """
    Verifica si la imagen proporcionada es una URL o un nombre de archivo,
    y obtiene la ruta completa del archivo dentro de MEDIA.
    """
    if not imagen_path.startswith(settings.MEDIA_URL):
        # Si es solo el nombre del archivo, concatenamos la ruta de MEDIA
        imagen_path = os.path.join(settings.MEDIA_ROOT, imagen_path)
    
    # Verifica si el archivo existe
    if not os.path.exists(imagen_path):
        print(f"El archivo {imagen_path} no existe.")
        return None
    
    return imagen_path

def analizar_imagen_crophealth(imagen_path):
    """
    Analiza una imagen utilizando la API de CropHealth. 
    Se espera que la imagen esté en una ruta válida dentro del directorio de media.
    """
    # Obtener la ruta completa de la imagen
    imagen_path_completa = obtener_ruta_imagen(imagen_path)
    
    if imagen_path_completa is None:
        return None  # Si no se pudo obtener la ruta de la imagen, salir de la función

    # Abrir la imagen y enviarla a la API para análisis
    with open(imagen_path_completa, 'rb') as img_file:
        files = {'image': img_file}
        headers = {'Api-Key': API_KEY}
        
        # Hacer la solicitud POST a la API
        response = requests.post(CROPHEALTH_URL, headers=headers, files=files)

    # Verificar la respuesta
    if response.status_code == 200:
        return response.json()  # Si la solicitud fue exitosa, devolver los datos
    else:
        print(f"Error al analizar la imagen: {response.status_code}")
        return None  # Si la solicitud falla, devolver None


