import { useEffect, useState } from 'react';

// Función para generar un número aleatorio dentro de un rango
function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export const Actividad14 = () => {
  const [reportData, setReportData] = useState<any[]>([]);

  // Generar datos de simulación
  function generateSimulationData(): void {
    const simulationData: any[] = [];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    // Simular datos para 5 años (60 meses)
    for (let i = 0; i < 60; i++) {
      const productionCost = getRandomNumber(5000, 10000); // Costo de producción aleatorio entre 5000 y 10000
      const sellingPrice = productionCost * getRandomNumber(1.2, 1.5); // Precio de venta entre 20% y 50% más del costo de producción
      const profit = sellingPrice - productionCost; // Ganancia

      simulationData.push({
        month: months[i % 12],
        year: Math.floor(i / 12) + 1,
        productionCost,
        sellingPrice,
        profit,
      });
    }

    setReportData(simulationData);
  }

  // Generar datos de simulación al cargar la página
  useEffect(() => {
    generateSimulationData();
  }, []);

  return (
    <div>
      <h1>Actividad 14</h1>
      <button onClick={generateSimulationData}>Generar datos de simulación</button>
      <table>
        <thead>
          <tr>
            <th>Mes</th>
            <th>Año</th>
            <th>Costo de Producción</th>
            <th>Precio de Venta</th>
            <th>Ganancia</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((data, index) => (
            <tr key={index}>
              <td>{data.month}</td>
              <td>{data.year}</td>
              <td>${data.productionCost.toFixed(2)}</td>
              <td>${data.sellingPrice.toFixed(2)}</td>
              <td>${data.profit.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

