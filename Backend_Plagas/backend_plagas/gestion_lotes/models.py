from django.db import models

class GestionLote(models.Model):
    id_gestion = models.AutoField(primary_key=True)
    fecha_gestion = models.DateField()
    estado_lote = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'GestionLote'

