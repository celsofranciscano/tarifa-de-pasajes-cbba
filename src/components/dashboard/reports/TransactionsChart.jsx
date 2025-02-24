"use client";

import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function TransactionsChart() {
  const [transactionData, setTransactionData] = useState([]);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Referencia para la instancia del gráfico

  useEffect(() => {
    const fetchData = async () => {
      setTransactionData([100, 150, 120, 170, 180, 200, 250]);
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
            label: "Número de Transacciones",
            data: transactionData,
            borderColor: "rgba(153, 102, 255, 1)",
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
  }, [transactionData]);

  return (
    <div className="border dark:border-zinc-800  p-8 shadow-md rounded-md">
      <h1 className="text-xl font-semibold mb-4 text-black">
      Número de Transacciones
      </h1>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default TransactionsChart;
