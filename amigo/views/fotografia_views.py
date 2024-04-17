import base64
from django.db.models import Avg
from django.core.paginator import Paginator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from ..models.clienteDB import Cliente
from ..models.fotografiaDB import Fotografia

class FotografiaPorID(APIView):
    def get(self, request, fotografia_id):
        try:
            fotografia = Fotografia.objects.get(pk=fotografia_id)
        except Fotografia.DoesNotExist:
            return Response({"error": "Fotografia no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        imagenBase64 = base64.b64encode(fotografia.imagenBase64).decode('utf-8')
        data = {
            "fotografia_id": fotografia.fotografia_id,
            "cliente_id": fotografia.cliente.cliente_id,
            "tipoImagen": fotografia.tipoImagen,
            "prioridad": fotografia.prioridad,
            "estado_fotografia": fotografia.estado_fotografia,
            "timestamp": fotografia.timestamp,
            "imagenBase64": imagenBase64,
        }
        return Response(data)
    
class FotografiasDeCliente(APIView):
    def get(self, request, cliente_id):
        try:
            cliente = Cliente.objects.get(pk=cliente_id)
        except Cliente.DoesNotExist:
            return Response({"error": "Cliente no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        
        fotografias = Fotografia.objects.filter(cliente=cliente)
        respuesta = []
        for foto in fotografias:
            imagenBase64 = base64.b64encode(foto.imagenBase64).decode('utf-8')
            newData = {
                "fotografia_id": foto.fotografia_id,
                "cliente_id": foto.cliente.cliente_id,
                "tipoImagen": foto.tipoImagen,
                "prioridad": foto.prioridad,
                "estado_fotografia": foto.estado_fotografia,
                "timestamp": foto.timestamp,
                "imagenBase64": imagenBase64,
            }
            respuesta.append(newData)
        return Response(respuesta)
    
class SubirFotografia(APIView):
    def post(self, request, format=None):
        for field in ['cliente_id', 'tipoImagen', 'prioridad', 'imagen', ]:
            if field not in request.data:
                return Response({"error": f"{field} no encontrado en los datos"}, status=status.HTTP_400_BAD_REQUEST)
        print(request.data)
        try:
            cliente = Cliente.objects.get(pk=request.data['cliente_id'])
        except Cliente.DoesNotExist:
            return Response({"error": "Cliente no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        imageBytes = request.data['imagen'].read()
        
        fotografiaNew = Fotografia(
            cliente=cliente,
            tipoImagen=request.data['tipoImagen'],
            prioridad=request.data['prioridad'],
            imagenBase64=imageBytes,
            estado_fotografia='P'
        )
        fotografiaNew.save()
        return Response({"message": f"Imagen {fotografiaNew.fotografia_id} guardada exitosamente"}, status=status.HTTP_201_CREATED)