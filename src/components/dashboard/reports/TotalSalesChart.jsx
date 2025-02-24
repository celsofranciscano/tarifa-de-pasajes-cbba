"use client";

import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function TotalSalesChart() {
  const [salesData, setSalesData] = useState([]);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Referencia para la instancia del gráfico

  useEffect(() => {
    const fetchData = async () => {
      // Datos de ejemplo
      setSalesData([1000, 1500, 2000, 2500, 2200, 2700, 3000]);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Destruye el gráfico existente si existe para evitar la reutilización del canvas
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
        ],
        datasets: [
          {
            label: "Ventas Totales",
            data: salesData,
            borderColor: "rgba(75, 192, 192, 1)",
            fill: false,
          },
        ],
      },
      options: { responsive: true },
    });

    // Limpia la instancia del gráfico cuando el componente se desmonte
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [salesData]);

  return (
    <div className="border dark:border-zinc-800 p-8 shadow-md rounded-md">
      <h1 className="text-xl font-semibold mb-4 text-black">
      Ventas Totales
      </h1>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default TotalSalesChart;
