import React, { useState, useEffect } from "react";
import Footer from "./Footer";

interface Cliente {
  tiempoLlegada: number;
  tiempoEspera: number;
  tiempoAtencion: number;
}

const ActividadOnce = () => {
  const [simulacionIniciada, setSimulacionIniciada] = useState(false);
  const [numeroClientesAtendidos, setNumeroClientesAtendidos] = useState(0);
  const [tiempoPromedioEspera, setTiempoPromedioEspera] = useState<number | null>(null);
  const [promedioTiempoAtencion, setPromedioTiempoAtencion] = useState<number | null>(null);
  const [clientesAtendidos, setClientesAtendidos] = useState<Cliente[]>([]);
  const [ventanilla1, setVentanilla1] = useState<Cliente | null>(null);
  const [ventanilla2, setVentanilla2] = useState<Cliente | null>(null);
  const [tiempoSimulacion, setTiempoSimulacion] = useState(0);
  const [clientesAtendidosVentanilla1, setClientesAtendidosVentanilla1] = useState(0);
  const [clientesAtendidosVentanilla2, setClientesAtendidosVentanilla2] = useState(0);

  const iniciarSimulacion = () => {
    setSimulacionIniciada(true);
    setNumeroClientesAtendidos(0);
    setTiempoPromedioEspera(null);
    setPromedioTiempoAtencion(null);
    setClientesAtendidos([]);
    setVentanilla1(null);
    setVentanilla2(null);
    setTiempoSimulacion(0);
    setClientesAtendidosVentanilla1(0);
    setClientesAtendidosVentanilla2(0);
  };

  useEffect(() => {
    const tiempoLlegadaCliente = 10; // Tasa de llegada de clientes (cada 10 segundos llega uno)

    const generarCliente = () => {
      const cliente: Cliente = {
        tiempoLlegada: tiempoSimulacion,
        tiempoEspera: 0,
        tiempoAtencion: 0,
      };
      return cliente;
    };

    const actualizarVentanillas = () => {
      if (!ventanilla1) {
        setVentanilla1(generarCliente());
      } else if (!ventanilla2) {
        setVentanilla2(generarCliente());
      }
    };

    const actualizarClientesAtendidos = () => {
      const nuevosClientes = clientesAtendidos.map((cliente) => ({
        ...cliente,
        tiempoEspera: cliente.tiempoEspera + tiempoLlegadaCliente,
      }));
      setClientesAtendidos(nuevosClientes);
    };

    const atenderClientes = () => {
      if (ventanilla1) {
        ventanilla1.tiempoAtencion += tiempoLlegadaCliente;
        if (ventanilla1.tiempoAtencion >= tiempoLlegadaCliente) {
          setVentanilla1(null);
          setNumeroClientesAtendidos((prev) => prev + 1);
          setClientesAtendidos((prev) => [...prev, ventanilla1]);
          setClientesAtendidosVentanilla1((prev) => prev + 1);
        }
      }

      if (ventanilla2) {
        ventanilla2.tiempoAtencion += tiempoLlegadaCliente;
        if (ventanilla2.tiempoAtencion >= tiempoLlegadaCliente) {
          setVentanilla2(null);
          setNumeroClientesAtendidos((prev) => prev + 1);
          setClientesAtendidos((prev) => [...prev, ventanilla2]);
          setClientesAtendidosVentanilla2((prev) => prev + 1);
        }
      }
    };

    const calcularEstadisticas = () => {
      const tiempoTotalEspera = clientesAtendidos.reduce((total, cliente) => total + cliente.tiempoEspera, 0);
      const tiempoTotalAtencion = clientesAtendidos.reduce((total, cliente) => total + cliente.tiempoAtencion, 0);

      const promedioEspera = tiempoTotalEspera / numeroClientesAtendidos;
      const promedioAtencion = tiempoTotalAtencion / numeroClientesAtendidos;

      setTiempoPromedioEspera(promedioEspera);
      setPromedioTiempoAtencion(promedioAtencion);
    };

    const simular = () => {
      actualizarClientesAtendidos();
      actualizarVentanillas();
      atenderClientes();
      calcularEstadisticas();
      setTiempoSimulacion((prev) => prev + tiempoLlegadaCliente);
    };

    const interval = setInterval(() => {
      simular();
    }, tiempoLlegadaCliente * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [simulacionIniciada, tiempoSimulacion, numeroClientesAtendidos, clientesAtendidos, ventanilla1, ventanilla2, clientesAtendidosVentanilla1, clientesAtendidosVentanilla2]);

  return (
    <div className="container pt-5">
      <h2 className="pt-5 fw-bold">Actividad 11</h2>
      <div className="row">
        <div className="card col-md-4">
          {!simulacionIniciada && (
            <button className="btn btn-success" onClick={iniciarSimulacion}>
              Iniciar Simulación
            </button>
          )}

          <div className="mt-3">
            <p>Número de clientes atendidos: {numeroClientesAtendidos}</p>
            <p>Tiempo promedio de espera: {tiempoPromedioEspera !== null ? tiempoPromedioEspera.toFixed(2) + ' s' : 'N/A'}</p>
            <p>Promedio de tiempo de atención: {promedioTiempoAtencion !== null ? promedioTiempoAtencion.toFixed(2) + ' s' : 'N/A'}</p>
            <p>Clientes atendidos por ventanilla 1: {clientesAtendidosVentanilla1}</p>
            <p>Clientes atendidos por ventanilla 2: {clientesAtendidosVentanilla2}</p>
          </div>
        </div>
        <div className="card col-md-8 text-center ">
          <table className="table table-active table-striped">
            <thead>
              <tr>
                <th>Tiempo Llegada</th>
                <th>Tiempo Espera</th>
                <th>Tiempo Atención</th>
              </tr>
            </thead>
            <tbody>
              {clientesAtendidos.map((cliente, index) => (
                <tr key={index}>
                  <td>{cliente.tiempoLlegada.toFixed(2)}</td>
                  <td>{cliente.tiempoEspera.toFixed(2)}</td>
                  <td>{cliente.tiempoAtencion.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ActividadOnce;
