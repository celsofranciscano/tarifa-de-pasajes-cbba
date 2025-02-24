"use client";

import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import axios from "axios";

Chart.register(...registerables);

function MonthlyIncomeChart() {
  const [monthlyIncome, setMonthlyIncome] = useState([]);
  const [labels, setLabels] = useState([]);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/dashboard/income/consumption/report");
        const data = response.data;
        
        if (data["2025"]) {
          const monthsData = data["2025"].months;
          const sortedMonths = Object.keys(monthsData).sort(); // Ordena los meses cronológicamente
          
          setLabels(sortedMonths);
          setMonthlyIncome(sortedMonths.map(month => monthsData[month]));
        }
      } catch (error) {
        console.error("Error fetching income report:", error);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Ingresos por Mes",
            data: monthlyIncome,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [labels, monthlyIncome]);

  return (
    <div className=" p-4 shadow-md rounded-md">
      <h1 className="text-xl font-semibold mb-4 text-black">
        Ingresos Mensuales por Consumo
      </h1>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default MonthlyIncomeChart;
