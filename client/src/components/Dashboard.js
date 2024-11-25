// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// const AdminDashboard = () => {
//   const [statistics, setStatistics] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStatistics = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/statistics');
//         setStatistics(response.data);
//       } catch (err) {
//         setError('Failed to fetch statistics');
//       }
//     };

//     fetchStatistics();
//   }, []);

//   if (error) {
//     return <p>{error}</p>;
//   }

//   if (!statistics) {
//     return <p>Loading...</p>;
//   }

//   const data = Object.keys(statistics.booksIssuedByMonth).map((month) => ({
//     month,
//     issued: statistics.booksIssuedByMonth[month],
//     returned: statistics.booksReturnedByMonth?.[month] || 0,
//   }));

//   return (
//     <div className="dashboard-container">
//       <h1>Admin Dashboard</h1>
//       <div className="statistics">
//         <p>Total Users: {statistics.totalUsers}</p>
//         <p>Total Books: {statistics.totalBooks}</p>
//         <p>Total Issued Books: {statistics.totalIssuedBooks}</p>
//         <p>Total Returned Books: {statistics.totalReturnedBooks}</p>
//       </div>

//       <div className="chart">
//         <h2>Books Issued by Month</h2>
//         <LineChart width={600} height={300} data={data}>
//           <CartesianGrid stroke="#ccc" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Line type="monotone" dataKey="issued" stroke="#8884d8" name="Issued Books"/>
//           <Line type="monotone" dataKey="returned" stroke="#82ca9d" name="Returned Books" />
//         </LineChart>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


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
