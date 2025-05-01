from django.db import models
from reporte_fotos.models import ReporteFotos

class ApiPlagas(models.Model):
    id_api = models.AutoField(primary_key=True)
    nombrePlanta = models.CharField(max_length=100)
    nombreCientificoPlanta = models.CharField(max_length=100)
    enfermedadPlanta = models.CharField(max_length=100)
    nombreCientificoEnfermedad = models.CharField(max_length=100)
    reporteFotos = models.ForeignKey(ReporteFotos, on_delete=models.CASCADE, db_column='reporteFotos_id')

    class Meta:
        managed = False
        db_table = 'ApiPlagas'

