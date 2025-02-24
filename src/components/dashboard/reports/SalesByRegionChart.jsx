"use client";

import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function SalesByRegionChart() {
  const [regionSales, setRegionSales] = useState([]);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Referencia para la instancia del gráfico

  useEffect(() => {
    const fetchData = async () => {
      setRegionSales([500, 700, 200, 900, 600]); // Datos de ejemplo
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
      type: "bar",
      data: {
        labels: ["Norte", "Sur", "Este", "Oeste", "Centro"],
        datasets: [
          {
            label: "Ventas por Región",
            data: regionSales,
            backgroundColor: "rgba(255, 206, 86, 0.6)",
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
  }, [regionSales]);

  return (
    <div className="border dark:border-zinc-800  p-8 shadow-md rounded-md">
      <h1 className="text-xl font-semibold mb-4 text-black">
      Ventas por Región
      </h1>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default SalesByRegionChart;
