import React, { useState } from 'react';

const Return = () => {
  const [books, setBooks] = useState([
    // { id: 1, name: "The Great Gatsby", author: "F. Scott Fitzgerald", type: "Fiction", returnDate: "2024-09-01" },
    // { id: 2, name: "Sapiens", author: "Yuval Noah Harari", type: "Non-fiction", returnDate: "2024-09-05" },
    // { id: 3, name: "Harry Potter", author: "J.K. Rowling", type: "Fantasy", returnDate: "2024-09-10" },
  ]);

  return (
    <div className="min-h-screen bg-cover bg-center p-8" style={{ backgroundImage: "url('./images/issuebg.jpg')" }}>
      <div className="container mx-auto px-4 py-8 bg-brown-100 bg-opacity-20 rounded-lg">
        <h1 className="text-6xl font-bold text-brown-800 text-center mb-6">Return Books</h1>
        <table className="min-w-full border-collapse bg-brown-700 rounded-lg overflow-hidden">
          <thead className="bg-brown-800 text-white">
            <tr>
              <th className="p-4 text-left">S.No.</th>
              <th className="p-4 text-left">Book Name</th>
              <th className="p-4 text-left">Author Name</th>
              <th className="p-4 text-left">Book Type</th>
              <th className="p-4 text-left">Return Date</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {books.map((book, index) => (
              <tr key={book.id} className={`bg-brown-600 ${index % 2 === 0 ? 'bg-brown-500' : 'bg-brown-600'} hover:bg-brown-700`}>
                <td className="p-4 text-left">{index + 1}</td>
                <td className="p-4 text-left">{book.name}</td>
                <td className="p-4 text-left">{book.author}</td>
                <td className="p-4 text-left">{book.type}</td>
                <td className="p-4 text-left">{book.returnDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Return;
