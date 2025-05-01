from django.db import models
from monitoreo.models import MonitoreoPlagas

class ReporteFotos(models.Model):
    id_reporteFotos = models.AutoField(primary_key=True)
    foto = models.CharField(max_length=200)
    monitoreo = models.ForeignKey(MonitoreoPlagas, on_delete=models.CASCADE, db_column='monitoreo_id')

    class Meta:
        managed = False
        db_table = 'ReporteFotos'

