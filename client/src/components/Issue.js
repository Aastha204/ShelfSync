import React, { useState } from 'react';

const Issue = () => {
  const [books, setBooks] = useState([
    // { id: 1, name: "The Great Gatsby", author: "F. Scott Fitzgerald", type: "Fiction", isIssued: true },
    // { id: 2, name: "Sapiens", author: "Yuval Noah Harari", type: "Non-fiction", isIssued: true },
    // { id: 3, name: "Harry Potter", author: "J.K. Rowling", type: "Fantasy", isIssued: true },
  ]);

  // Function to handle returning books
  const returnBook = (id) => {
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, isIssued: false };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  return (
    <div className="min-h-screen bg-cover bg-center p-8" style={{ backgroundImage: "url('./images/issuebg.jpg')" }}>
      <div className="container mx-auto px-4 py-8 bg-cyan-800 bg-opacity-40 rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-cyan-950 text-center mb-6">Your Books</h1>
        <table className="min-w-full border-collapse bg-white-900 rounded-lg overflow-hidden shadow-md">
          <thead>
            <tr className="bg-cyan-950 text-white">
              <th className="p-4 text-left">S.No.</th>
              <th className="p-4 text-left">Book Name</th>
              <th className="p-4 text-left">Author Name</th>
              <th className="p-4 text-left">Book Type</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {books.map((book, index) => (
              <tr key={book.id} className={`hover:bg-sky-700 ${index % 2 === 0 ? 'bg-cyan-900' : 'bg-sky-950'}`}>
                <td className="p-4 text-left">{index + 1}</td>
                <td className="p-4 text-left">{book.name}</td>
                <td className="p-4 text-left">{book.author}</td>
                <td className="p-4 text-left">{book.type}</td>
                <td className="p-4 text-left">
                  {book.isIssued && (
                    <button
                      onClick={() => returnBook(book.id)}
                      className="px-4 py-2 rounded text-white bg-red-500 hover:bg-red-700"
                    >
                      Return
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Issue;
