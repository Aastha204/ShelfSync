import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LineChart from './LineChart';

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

        // Set data for the line chart
        setChartData({
          labels: Object.keys(booksIssuedByMonth),
          datasets: [
            {
              label: 'Books Issued',
              data: Object.values(booksIssuedByMonth),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Books Returned',
              data: Object.values(booksReturnedByMonth),
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
            {
              label: 'Books Due',
              data: Object.values(booksDueByMonth), // Due books data
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
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
      <LineChart data={chartData} />
    </div>
  );
};

export default Dashboard;
