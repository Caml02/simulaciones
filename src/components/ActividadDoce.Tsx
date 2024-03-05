import React, { useState, useEffect } from 'react';
import Footer from './Footer';

interface Aterrizaje {
  cantidad: number;
  timestamp: string;
}

const ActividadDoce = () => {
  const [aterrizajes, setAterrizajes] = useState<Aterrizaje[]>([]);
  const [horaInicio, setHoraInicio] = useState<string>(new Date().toLocaleTimeString());
  const [totalAterrizajes, setTotalAterrizajes] = useState<number>(0);
  const [simulacionActiva, setSimulacionActiva] = useState<boolean>(true);

  const simularAterrizaje = () => {
    if (simulacionActiva) {
      const cantidadAterrizajes = Math.floor(Math.random() * 5) + 1;
      setAterrizajes(prevAterrizajes => [
        ...prevAterrizajes,
        { cantidad: cantidadAterrizajes, timestamp: new Date().toLocaleTimeString() }
      ]);
      setTotalAterrizajes(prevTotal => prevTotal + cantidadAterrizajes);

      console.log(`Se realizaron ${cantidadAterrizajes} aterrizajes. Total: ${totalAterrizajes}`);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      simularAterrizaje();
    }, 20 * 1000);
  
    // Limpiar el intervalo cuando el componente se desmonta o cuando la simulación se detiene
    return () => clearInterval(intervalId);
  }, [simulacionActiva]); // Agrega simulacionActiva como dependencia
  

  const handleIniciarSimulacion = () => {
    setSimulacionActiva(true);
  };

  const handleDetenerSimulacion = () => {
    setSimulacionActiva(false);
  };


  return (
    <div className='pt-5'>      
      <div className='container'>
        <h1 className='pt-5 fw-bold'>Actividad 12</h1>
        <div className='row mt-4'>
          <div className="card col-md-4 justify-content-center">
            <p>Hora de inicio: {horaInicio}</p>
            <p>Cantidad de aterrizajes en el último intervalo: {aterrizajes.length > 0 ? aterrizajes[aterrizajes.length - 1].cantidad : 0}</p>
            <p>Total de aterrizajes: {totalAterrizajes}</p>
            <button className='btn btn-success' onClick={handleIniciarSimulacion} disabled={simulacionActiva}>
              Iniciar Simulación
            </button>
            <button className='btn btn-danger' onClick={handleDetenerSimulacion} disabled={!simulacionActiva}>
              Detener Simulación
            </button>
          </div>
          <div className="card col-md-8">
            <table className='table table-striped text-center'>
              <thead>
                <tr>
                  <th>Hora de evento</th>
                  <th>Cantidad de aterrizajes</th>
                </tr>
              </thead>
              <tbody>
                {aterrizajes.map((aterrizaje, index) => (
                  <tr key={index}>
                    <td>{aterrizaje.timestamp}</td>
                    <td>{aterrizaje.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card col-12 mt-4">
            <div className="card-body">
                        <h3 className="fw-bold">
                            Simulación
                        </h3>
                        <p>Este programa simula la cantidad de aviones que aterrizan en un aeropuerto.</p>
                        <p>La cantidad de aviones que despegan es aleatoria, y se actualiza cada minuto.</p>
                        <p>La tabla muestra la cantidad de aviones que despegaron y la hora en que lo hicieron.</p>
                        <p>El programa corre indefinidamente, por lo que la tabla se actualiza cada minuto.</p>


                        <h3 className='fw-bold'>Sobre el Codigo</h3>
                        <h5>Estado del Componente:</h5>
                        <p>
                            Utiliza el estado <code>aterrizajes</code> para almacenar la información de cada aterrizaje en un array.
                        </p>

                        <h5>Función <code>simularAterrizaje</code>:</h5>
                        <p>
                            Genera un número aleatorio entre 1 y 5 para representar la cantidad de aterrizajes. <br />
                            Actualiza el estado <code>aterrizajes</code> añadiendo un nuevo objeto con la cantidad de aterrizajes y el timestamp actual.
                        </p>

                        <h5>Efecto de <code>useEffect</code>:</h5>
                        <p>
                            Utiliza <code>useEffect</code> para ejecutar la simulación de aterrizajes en un intervalo de 60 segundos. <br />
                            El intervalo se establece con <code>setInterval</code> y llama a la función <code>simularAterrizaje</code> cada minuto. <br />
                        </p>
                    
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  );
};

export default ActividadDoce;