"use client";

import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function SalesByCategoryChart() {
  const [categoryData, setCategoryData] = useState([]);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Referencia para guardar la instancia del gráfico

  useEffect(() => {
    const fetchData = async () => {
      setCategoryData([30, 20, 25, 15, 10]); // Datos de ejemplo
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
      type: "pie",
      data: {
        labels: ["Electrónica", "Ropa", "Hogar", "Libros", "Juguetes"],
        datasets: [
          {
            label: "Ventas por Categoría",
            data: categoryData,
            backgroundColor: [
              "#ff6384",
              "#36a2eb",
              "#ffce56",
              "#4bc0c0",
              "#9966ff",
            ],
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
  }, [categoryData]);

  return (
    <div className="border dark:border-zinc-800  p-8 shadow-md rounded-md">
      <h1 className="text-xl font-semibold mb-4 text-black">
      Ventas por Categoría
      </h1>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default SalesByCategoryChart;
