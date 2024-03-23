from django.db import models

class solicitud_alquiler(models.Model):
    
    ESTADO_SOLICITUD = (
        ('E', 'Enviado'),
        ('A', 'Aceptado'),
        ('R', 'Rechazado'),
        ('F', 'Finalizado')
    )
  
    solicitud_alquiler_id = models.BigAutoField(primary_key=True)
    cliente = models.ForeignKey('Cliente', on_delete=models.CASCADE)
    amigo = models.ForeignKey('Amigo', on_delete=models.CASCADE)
    lugar = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=100)
    fecha_inicio = models.DateField()
    minutos = models.IntegerField()
    estado_solicitud = models.CharField(max_length=1, choices=ESTADO_SOLICITUD)
    timestamp_registro = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"cliente {self.cliente.nombre} solicita  {self.amigo.cliente.nombre}" # revisar si dara bien 