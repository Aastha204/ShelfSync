import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
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

        // Set data for the grouped bar chart
        setChartData({
          labels: Object.keys(booksIssuedByMonth), // Months as labels
          datasets: [
            {
              label: 'Books Issued',
              data: Object.values(booksIssuedByMonth),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
              label: 'Books Returned',
              data: Object.values(booksReturnedByMonth),
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
            {
              label: 'Books Due',
              data: Object.values(booksDueByMonth),
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
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
    <div>
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
            },
            legend: {
              display: true,
              position: 'top',
            },
          },
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
                text: 'Number of Books',
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default Dashboard;
