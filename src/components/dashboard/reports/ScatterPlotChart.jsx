'use client';

import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function ScatterPlotChart({ isDarkMode }) {
    const [scatterData, setScatterData] = useState([]);
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null); // Referencia para guardar la instancia del gráfico

    useEffect(() => {
        const fetchData = async () => {
            // Datos de ejemplo: [x, y] para cada punto
            setScatterData([
                { x: 5, y: 20 },
                { x: 10, y: 40 },
                { x: 15, y: 30 },
                { x: 20, y: 60 },
                { x: 25, y: 80 },
                { x: 30, y: 70 },
                { x: 35, y: 90 },
            ]);
        };
        fetchData();
    }, []);

    useEffect(() => {
        // Destruye el gráfico existente si existe para evitar la reutilización del canvas
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        chartInstanceRef.current = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Altura vs Peso',
                    data: scatterData,
                    backgroundColor: isDarkMode ? 'rgba(75, 192, 192, 1)' : 'rgba(54, 162, 235, 1)',
                    borderColor: isDarkMode ? 'rgba(75, 192, 192, 1)' : 'rgba(54, 162, 235, 1)',
                    pointRadius: 5,
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Altura (cm)',
                            color: isDarkMode ? '#ffffff' : '#000000',
                        },
                        grid: {
                            color: isDarkMode ? '#444444' : '#dddddd',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Peso (kg)',
                            color: isDarkMode ? '#ffffff' : '#000000',
                        },
                        grid: {
                            color: isDarkMode ? '#444444' : '#dddddd',
                        },
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: isDarkMode ? '#ffffff' : '#000000',
                        },
                    },
                },
            },
        });

        // Limpia la instancia del gráfico cuando el componente se desmonte
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [scatterData, isDarkMode]); // Agregar isDarkMode a las dependencias

    return (
          <div className="border dark:border-zinc-800 p-8 shadow-md rounded-md">
      <h1 className="text-xl font-semibold mb-4 text-black">
      Gráfico de Dispersión: Altura vs Peso
            </h1>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default ScatterPlotChart;
