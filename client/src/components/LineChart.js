import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';  // Importing Chart.js
import '../styles/LineChart.css'

const LineChart = ({ data }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);  // To store the chart instance

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    
    if (ctx) {
      // Destroy the previous chart instance if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      
      // Create a new chart
      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Months',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Books Count',
              },
            },
          },
        },
      });
    }

    // Cleanup function to destroy chart when the component is unmounted
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);  // Re-run the effect when data changes

  return <canvas ref={canvasRef}></canvas>;
};

export default LineChart;
