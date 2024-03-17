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

    let totalProductionCost = 0;
    let totalProfit = 0;
    let yearlyProductionCosts: number[] = []; // Array para almacenar los costos de producción de cada año
    let yearlyProfits: number[] = []; // Array para almacenar las ganancias de cada año

    // Inicializar los valores de los costos de producción y las ganancias de cada año
    for (let i = 0; i < 5; i++) {
      yearlyProductionCosts.push(0);
      yearlyProfits.push(0);
    }

    // Simular datos para 5 años (60 meses)
    for (let i = 0; i < 60; i++) {
      const productionCost = getRandomNumber(5000, 10000); // Costo de producción aleatorio entre 5000 y 10000
      const sellingPrice = productionCost * getRandomNumber(1.2, 1.5); // Precio de venta entre 20% y 50% más del costo de producción
      const profit = sellingPrice - productionCost; // Ganancia

      totalProductionCost += productionCost;
      totalProfit += profit;

      const yearIndex = Math.floor(i / 12); // Índice del año actual en los arrays de costos de producción y ganancias anuales
      yearlyProductionCosts[yearIndex] += productionCost; // Agregar el costo de producción al año correspondiente
      yearlyProfits[yearIndex] += profit; // Agregar la ganancia al año correspondiente

      simulationData.push({
        month: months[i % 12],
        year: yearIndex + 1, // Año actual
        productionCost,
        sellingPrice,
        profit,
      });
    }

    setReportData(simulationData);

    // Actualizar los datos de las tarjetas con los costos de producción y las ganancias de cada año
    for (let i = 0; i < 5; i++) {
      document.getElementById(`year-${i + 1}-cost`)!.innerText = `$${yearlyProductionCosts[i].toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
      document.getElementById(`year-${i + 1}-profit`)!.innerText = `$${yearlyProfits[i].toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }

    document.getElementById('total-cost')!.innerText = `$${totalProductionCost.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('total-profit')!.innerText = `$${totalProfit.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  }

  // Generar datos de simulación al cargar la página
  useEffect(() => {
    generateSimulationData();
  }, []);

  return (
    <div className='container py-5'>
      <h1 className='py-5'>Actividad 14</h1>
      <div className="row">
        <div className="card col-md-3">
          <button className='mt-2 btn btn-primary w-100' onClick={generateSimulationData}>Generar datos de simulación</button>
          <div className='card mt-2'>
            <div className="card-body">
                <p>Gasto total: <span id="total-cost"></span></p>
                <p>Ganancia total: <span id="total-profit"></span></p>
            </div>
          </div>
        </div>
        <div className="card col-md-9" style={{height: "350px", overflowY:"auto"}}>
          <div className="card-body text-center">
            <table className='table table-striped '>
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
                    <td>${data.productionCost.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    <td>${data.sellingPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    <td>${data.profit.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='card col-12'>
          <div className='card-body'>
            <div className="row">
              <div className="col-md-6">
                <h5>Gasto total en cada año</h5>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Año</th>
                      <th>Costo de Producción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map(year => (
                      <tr key={year}>
                        <td>{year}</td>
                        <td id={`year-${year}-cost`}></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="col-md-6">
                <h5>Ganancia total en cada año</h5>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Año</th>
                      <th>Ganancia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map(year => (
                      <tr key={year}>
                        <td>{year}</td>
                        <td id={`year-${year}-profit`}></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
            <div className='card col-md-12'>
                <div className='card-body'>
                    <h5>Explicación de la simulación</h5>
                    <p>En esta simulación, estamos generando de forma aleatoria los costos de producción para un producto ficticio. Estos costos están dentro de un rango entre $5000 y $10000, representando la variabilidad de los costos en la producción real.</p>
                    <p>Una vez generados los costos de producción, calculamos el precio de venta para cada producto. El precio de venta se establece como un múltiplo aleatorio del costo de producción, entre un 20% y un 50% más del costo.</p>
                    <p>Con los datos de costos de producción y precios de venta, calculamos la ganancia para cada producto, que es la diferencia entre el precio de venta y el costo de producción.</p>
                    <p>Finalmente, agregamos los datos a una tabla para visualización y calculamos los totales de gastos y ganancias, así como las ganancias totales por año.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
