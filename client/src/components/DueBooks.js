import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DueBooks = () => {
  const [dueBooks, setDueBooks] = useState([]);

  useEffect(() => {
    const fetchDueBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/issues/due-books');
        setDueBooks(response.data.data);
      } catch (error) {
        console.error('Error fetching due books:', error);
      }
    };

    fetchDueBooks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold">Due Books</h2>
      <table className="table-auto w-full border-collapse border border-gray-200 mt-4">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Issue ID</th>
            <th className="border border-gray-300 px-4 py-2">Book Title</th>
            <th className="border border-gray-300 px-4 py-2">User Name</th>
            <th className="border border-gray-300 px-4 py-2">Due Date</th>
            <th className="border border-gray-300 px-4 py-2">Overdue Days</th>
            <th className="border border-gray-300 px-4 py-2">Fine</th>
          </tr>
        </thead>
        <tbody>
          {dueBooks.map((book) => (
            <tr key={book.issueId}>
              <td className="border border-gray-300 px-4 py-2">{book.issueId}</td>
              <td className="border border-gray-300 px-4 py-2">{book.book.title}</td>
              <td className="border border-gray-300 px-4 py-2">{book.user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(book.dueDate).toLocaleDateString()}</td>
              <td className="border border-gray-300 px-4 py-2">{book.overdueDays}</td>
              <td className="border border-gray-300 px-4 py-2">${book.fine}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DueBooks;
