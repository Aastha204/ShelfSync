import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import "../styles/dashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    totalBooks: 0,
    totalIssuedBooks: 0,
    totalReturnedBooks: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/statistics');
        const {
          totalUsers,
          totalBooks,
          totalIssuedBooks,
          totalReturnedBooks,
          booksIssuedByMonth,
          booksReturnedByMonth,
          booksDueByMonth,
        } = response.data;

        // Set statistics for display
        setStatistics({
          totalUsers,
          totalBooks,
          totalIssuedBooks,
          totalReturnedBooks,
        });

        // Set data for the grouped bar chart with shades of brown
        setChartData({
          labels: Object.keys(booksIssuedByMonth), // Months as labels
          datasets: [
            {
              label: 'Books Issued',
              data: Object.values(booksIssuedByMonth),
              backgroundColor: '#743D2B', // Dark brown for books issued
              barThickness: 50,  // Optional: to adjust the thickness of the bars
            },
            {
              label: 'Books Returned',
              data: Object.values(booksReturnedByMonth),
              backgroundColor: '#B06C49', // Medium brown for books returned
              barThickness: 50,  // Optional: to adjust the thickness of the bars
            },
            {
              label: 'Books Due',
              data: Object.values(booksDueByMonth),
              backgroundColor: '#E0AB8B', // Lighter brown for books due
              barThickness: 50,  // Optional: to adjust the thickness of the bars
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!chartData) return <div>Loading...</div>;

  return (
    <div className='dashboard-container'>
      <h2>Admin Dashboard</h2>
      <div className="statistics">
        <p>Total Users: {statistics.totalUsers}</p>
        <p>Total Books: {statistics.totalBooks}</p>
        <p>Total Issued Books: {statistics.totalIssuedBooks}</p>
        <p>Total Returned Books: {statistics.totalReturnedBooks}</p>
      </div>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Monthly Book Statistics',
              font: {
                size: 37, // Increase title font size
              },
              padding: {
                top: 20,
                bottom: 20,
              },
            },
            legend: {
              display: true,
              position: 'top',
              labels: {
                font: {
                  size: 16, // Increase legend font size
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Months',
                font: {
                  size: 18, // Increase x-axis title font size
                },
                padding: {
                  top: 10,
                  bottom: 10, // Adjust padding to provide more space
                },
              },
              grid: {
                display: false, // Hide grid lines for a cleaner look
              },
              stacked: false, // Important: Ensure bars are side by side, not stacked
              ticks: {
                font: {
                  size: 14, // Increase x-axis tick font size
                },
              },
            },
            y: {
              title: {
                display: true,
                text: 'Number of Books',
                font: {
                  size: 18, // Increase y-axis title font size
                },
                padding: {
                  top: 10,
                  bottom: 10, // Adjust padding to provide more space
                },
              },
              beginAtZero: true,
              grid: {
                display: true, // Show grid lines for clarity
              },
              ticks: {
                font: {
                  size: 14, // Increase y-axis tick font size
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Dashboard;
