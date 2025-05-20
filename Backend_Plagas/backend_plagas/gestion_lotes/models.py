from django.db import models

class GestionLote(models.Model):
    ESTADOS = [
        ('activo', 'Activo'),
        ('inactivo', 'Inactivo'),
        ('tratamiento', 'En tratamiento'),
    ]

    id_gestion = models.AutoField(primary_key=True)
    fecha_gestion = models.DateField()
    estado_lote = models.CharField(max_length=50, choices=ESTADOS)

    class Meta:
        managed = False
        db_table = 'GestionLote'


