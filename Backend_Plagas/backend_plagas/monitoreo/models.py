from django.db import models
from registro_siembra.models import RegistroSiembra

class MonitoreoPlagas(models.Model):
    id_monitoreo = models.AutoField(primary_key=True)
    fecha_monitoreo = models.DateField()
    reporte = models.CharField(max_length=100)
    observacionAnomalia = models.CharField(max_length=200)
    registro = models.ForeignKey(RegistroSiembra, on_delete=models.CASCADE, db_column='registro_id')

    class Meta:
        managed = False
        db_table = 'MonitoreoPlagas'

