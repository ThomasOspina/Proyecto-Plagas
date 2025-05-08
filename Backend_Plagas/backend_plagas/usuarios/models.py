from django.db import models

class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=75)
    correo = models.EmailField(max_length=100)
    telefono = models.CharField(max_length=20)
    rol = models.CharField(max_length=50)
    contraseña = models.CharField(max_length=128)

    class Meta:
        managed = False
        db_table = 'Usuario'


