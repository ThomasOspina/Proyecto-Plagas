from django.db import models
from gestion_lotes.models import GestionLote
from usuarios.models import Usuario

class RegistroSiembra(models.Model):
    id_registro = models.AutoField(primary_key=True)
    fecha_siembra = models.DateField()
    cantidad_plantas = models.IntegerField()
    tipo_planta = models.CharField(max_length=50)
    ubicacion = models.CharField(max_length=100)
    numeroLote = models.CharField(max_length=20)
    gestion = models.ForeignKey(GestionLote, on_delete=models.CASCADE, db_column='gestion_id')
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='usuario_id')

    class Meta:
        managed = False
        db_table = 'RegistroSiembra'

