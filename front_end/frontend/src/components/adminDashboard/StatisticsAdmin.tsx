import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Statistics: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      
      if (ctx) {
     
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        
 
        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: ["Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre"],
            datasets: [
              {
                label: "Plagas Reportadas",
                data: [8, 15, 5, 20, 25, 15, 10],
                borderColor: "#4CAF50",
                backgroundColor: "transparent",
                pointBackgroundColor: "#4CAF50",
                pointRadius: 6,
                pointHoverRadius: 8,
                tension: 0.1
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                backgroundColor: "#212121",
                titleColor: "#ffffff",
                bodyColor: "#4CAF50",
                borderColor: "#2c2c2c",
                borderWidth: 1
              },
              title: {
                display: true,
                text: "Plagas Reportadas",
                color: "#4CAF50",
                font: {
                  size: 16
                }
              }
            },
            scales: {
              x: {
                grid: {
                  color: "rgba(255, 255, 255, 0.05)"
                },
                ticks: {
                  color: "#aaaaaa"
                }
              },
              y: {
                beginAtZero: true,
                grid: {
                  color: "rgba(255, 255, 255, 0.05)"
                },
                ticks: {
                  color: "#aaaaaa"
                }
              }
            }
          }
        });
      }
    }


    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <h2>Estadísticas de Plagas</h2>
      <div className="stats-container">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default Statistics;