from django.db import models
from apiplagas.models import ApiPlagas
from usuarios.models import Usuario

class PlanificacionTratamiento(models.Model):
    id_planificacion = models.AutoField(primary_key=True)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    informetratamiento = models.CharField(max_length=100)
    api = models.ForeignKey(ApiPlagas, on_delete=models.CASCADE, db_column='api_id')
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='usuario_id')

    class Meta:
        managed = False
        db_table = 'PlanificacionTratamiento'

