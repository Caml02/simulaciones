import { useEffect, useState } from "react";
import Footer from "./Footer";

interface SimulacionData {
  id: number;
  numeroPasajeros: number;
  tiempoEspera: number;
  pasajerosLlegan: number;
}

const ActividadDiez = () => {
  const [simulacionData, setSimulacionData] = useState<SimulacionData[]>([]);
  const [tiempo, setTiempo] = useState<number>(0);
  const [contadorViajes, setContadorViajes] = useState<number>(0);
  const [simulacionIniciada, setSimulacionIniciada] = useState<boolean>(false);
  const [promedioPasajerosLlegan, setPromedioPasajerosLlegan] = useState<number | null>(null);
  const [totalPasajerosPrimerViaje, setTotalPasajerosPrimerViaje] = useState<number>(0);
  const [totalPasajerosSegundoViaje, setTotalPasajerosSegundoViaje] = useState<number>(0);

  const numeroParadas = 2;
  const tiempoEsperaPromedio = 1; // en minutos
  const capacidadAutobus = 40;
  const tasaLlegadaPasajeros = 10; // pasajeros por minuto
  const distribucionLlegada = "Poisson";

  const generarNumeroPasajerosAleatorio = (distribucion: string): number => {
    if (distribucion === "Poisson") {
      return Math.round(-Math.log(Math.random()) / (1 / tasaLlegadaPasajeros));
    } else {
      return 0;
    }
  };

  const ejecutarSimulacion = () => {
  
    // Lógica de simulación
    if (simulacionIniciada && contadorViajes < 2) {
      const datosParadaActual: SimulacionData = {
        id: simulacionData.length + 1,
        numeroPasajeros: 0,
        tiempoEspera: Math.floor(Math.random() * tiempoEsperaPromedio) + 1,
        pasajerosLlegan: 0,
      };

      //Pasajeros que llegan a la parada actual
  
      if (tiempo === 0) {
        datosParadaActual.numeroPasajeros = generarNumeroPasajerosAleatorio(distribucionLlegada);
        datosParadaActual.pasajerosLlegan = datosParadaActual.numeroPasajeros;
      } else {
        const pasajerosQueLlegan = generarNumeroPasajerosAleatorio(distribucionLlegada);
  
        datosParadaActual.numeroPasajeros =
          Math.min(pasajerosQueLlegan, capacidadAutobus) +
          simulacionData[simulacionData.length - 1].numeroPasajeros;
        datosParadaActual.pasajerosLlegan = pasajerosQueLlegan;
      }
  
      setSimulacionData((prevData) => [...prevData, datosParadaActual]);
      setTiempo((prevTiempo) => prevTiempo + 1);
  
      // Actualiza el total de pasajeros del primer viaje y comienza la cuenta atrás para el segundo viaje
      
      if (contadorViajes === 0) {
        // Solo durante el primer viaje, actualiza el total de pasajeros del primer viaje
        setTotalPasajerosPrimerViaje((prevTotal) => prevTotal + datosParadaActual.pasajerosLlegan);
      }

      // Actualiza el total de pasajeros del segundo viaje
      
      if (contadorViajes >= 1) {
        // Solo durante el primer viaje, actualiza el total de pasajeros del primer viaje
        setTotalPasajerosSegundoViaje((prevTotal) => prevTotal + datosParadaActual.pasajerosLlegan);
      }

      // Verificación de la condición después de actualizar el estado
      if (tiempo >= numeroParadas * 2 - 1) {
        setContadorViajes((prevContador) => prevContador + 1);
        setTiempo(0);
      }
    }
    if (contadorViajes >= 2) {
      setSimulacionIniciada(false);
      const totalPasajerosLlegan = simulacionData.reduce((total, parada) => total + parada.pasajerosLlegan, 0);
      const promedio = totalPasajerosLlegan / (numeroParadas * 2);
      setPromedioPasajerosLlegan(promedio);
      console.log("Total de pasajeros que llegan: ", totalPasajerosLlegan);
      console.log("Número total de paradas: ", numeroParadas * 2);
      console.log("Promedio de pasajeros que llegan: ", promedio.toFixed(2));
    }
  };
  
  
  // Resto del código...
  
  

  const iniciarSimulacion = () => {
    setSimulacionData([]);
    setTiempo(0);
    setContadorViajes(0);
    setSimulacionIniciada(true);
    setPromedioPasajerosLlegan(null);
    setTotalPasajerosPrimerViaje(0); 
    setTotalPasajerosSegundoViaje(0);  
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      ejecutarSimulacion();
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [tiempo, contadorViajes, simulacionData, ejecutarSimulacion]);
  
  
  return (
    <div>
      <div className="container pt-5">
      <h1 className="pt-5">Actividad Diez</h1>

      <div className="row">
        <div className="card col-md-4">
          <div className="card-body">
            <h5 className="card-title">Iniciar Simulación</h5>
            <button className="btn btn-primary" onClick={iniciarSimulacion} disabled={simulacionIniciada}>
              Iniciar
            </button>
            {simulacionIniciada && (
                <div className="mt-3">
                  <p>Viajes realizados: {contadorViajes}</p>
                  <p>Tiempo transcurrido: {tiempo} minutos</p>
                </div>
              )}
              {!simulacionIniciada && (
                <div className="mt-3">
                  <p>Viajes realizados: {contadorViajes}</p>
                  <p>Tiempo transcurrido: {tiempo} minutos</p>
                </div>
              )}
              {promedioPasajerosLlegan !== null && (
              <div className="mt-3">
                <p>Promedio de pasajeros que llegan: {promedioPasajerosLlegan.toFixed(2)}</p>
                <p>Total de pasajeros en el primer viaje: {totalPasajerosPrimerViaje}</p>
                <p>Total de pasajeros en el Segundo viaje: {totalPasajerosSegundoViaje}</p>
              </div>
            )}
          </div>
        </div>

        <div className="card col-md-8">
          {simulacionIniciada && (
            <table className="table table-striped text-center">
              <thead>
                <tr>
                  <th>Parada</th>
                  <th>Pasajeros Por Subir</th>
                  <th>Pasajeros Recolectados</th>
                  <th>Tiempo Espera</th>
                </tr>
              </thead>
              <tbody>
                {simulacionData.map((parada) => (
                  <tr key={parada.id}>
                    <td>{parada.id}</td>
                    <td>{parada.pasajerosLlegan}</td>
                    <td>{parada.numeroPasajeros}</td>
                    <td>{parada.tiempoEspera} min</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!simulacionIniciada && (
            <table className="table table-striped text-center">
              <thead>
                <tr>
                  <th>Parada</th>
                  <th>Pasajeros Por Subir</th>
                  <th>Pasajeros Recolectados</th>
                  <th>Tiempo Espera</th>
                </tr>
              </thead>
              <tbody>
                {simulacionData.map((parada) => (
                  <tr key={parada.id}>
                    <td>{parada.id}</td>
                    <td>{parada.pasajerosLlegan}</td>
                    <td>{parada.numeroPasajeros}</td>
                    <td>{parada.tiempoEspera} min</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {!simulacionIniciada && (
          <div className="card col-12 mt-2">
            <div className="card-body">
              <h4 className="title">Resumen de la Simulación</h4>
              <p>En esta simulación, el autobús realiza paradas en diferentes momentos con un número de pasajeros aleatorios que lo abordan.</p>
              <ul>
                <li>Cada minuto, el autobús hace una parada de acuerdo al viaje que consta de 4 paradas.</li>
                <li>El número de pasajeros en cada parada varía según la distribución de llegada (Poisson).</li>
                <li>El tiempo de espera en cada parada es aleatorio y tiene un promedio de {tiempoEsperaPromedio} minuto(s).</li>
                <li>El autobús tiene una capacidad máxima de {capacidadAutobus} pasajeros.</li>
                <li>La tasa de llegada de pasajeros es de {tasaLlegadaPasajeros} pasajeros por minuto.</li>
                <li>La distribución de llegada de pasajeros sigue un modelo {distribucionLlegada}.</li>
                <li>La simulasion hace intervalos en tiempo real de 1 segundo representando {tiempoEsperaPromedio} minuto(s) por parada.</li>
              </ul>
              <p>Al final de la simulación, se muestra el promedio de pasajeros que llegan en cada parada y cuanto subieron en cada viaje.</p>
            </div>
          </div>
        )}
      </div>
    </div>
          <Footer/>
    </div>

  );
};

export default ActividadDiez;
