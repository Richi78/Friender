import React from 'react'
import './SolicitudesAceptadas.css'
import SolicitudAceptada from '../../Components/CartSolicitudesAccept/SolicitudAceptada'
import logo from '../../logo-friender.png';
import { useGetSolicitudesAceptadasQuery } from './solicitudesSlice';
import { useCookies } from 'react-cookie';
import Loading from '../../Components/Loading';

const SolicitudesAceptadas = () => {
  
//   const url = URL.createObjectURL(logo)
  const [cookies] = useCookies(["token"]);
  const {data, isFetching, isSuccess} = useGetSolicitudesAceptadasQuery(cookies.token)

  if (isFetching){
    return <Loading />
  } else if (isSuccess){

    return (
      <div className='solicitudes-aceptadas'>
        <div className="solicitudes-aceptadas-header">
          <h1 id="titulo-solicitudes">Encuentros Programados</h1>
        </div>
        <div className='aceptadas'>
          {
            data.solicitudes_recibidas.length>0 ? 
            data.solicitudes_recibidas.map((solicitud) => {
              return (
                <>
                  <SolicitudAceptada 
                    imagenBase64={solicitud.imagenes[0].imagenBase64}
                    nombre_cliente={solicitud.nombre_cliente}
                    fecha_inicio={solicitud.fecha_inicio}
                    hora_inicio={solicitud.hora_inicio}
                    lugar={solicitud.lugar}
                    solicitud_aceptada_id={4}
                    duracion={solicitud.duracion}
                  />
                </>
              )
            })
            : <p>Upss no tienes Encuentros Programados</p>
          }
        </div>
      </div>
    )
  }
}

export default SolicitudesAceptadas