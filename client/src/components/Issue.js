import React, { useState } from 'react';

const Issue = () => {
  const [books, setBooks] = useState([
    { id: 1, name: "The Great Gatsby", author: "F. Scott Fitzgerald", type: "Fiction", isIssued: false },
    { id: 2, name: "Sapiens", author: "Yuval Noah Harari", type: "Non-fiction", isIssued: false },
    { id: 3, name: "Harry Potter", author: "J.K. Rowling", type: "Fantasy", isIssued: false },
  ]);

  // Function to handle issuing/returning books
  const toggleIssueBook = (id) => {
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, isIssued: !book.isIssued };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  return (
    <div className="min-h-screen bg-cover bg-center p-8" style={{ backgroundImage: "url('Images/issue.jpg')" }}>
      <div className="container mx-auto px-4 py-8 bg-brown-800 bg-opacity-20 rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-white text-center mb-6">Your Books</h1>
        <table className="min-w-full border-collapse bg-brown-900 rounded-lg overflow-hidden shadow-md">
          <thead>
            <tr className="bg-brown-800 text-white">
              <th className="p-4 text-left">S.No.</th>
              <th className="p-4 text-left">Book Name</th>
              <th className="p-4 text-left">Author Name</th>
              <th className="p-4 text-left">Book Type</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {books.map((book, index) => (
              <tr key={book.id} className={`hover:bg-brown-600 ${index % 2 === 0 ? 'bg-brown-400' : 'bg-brown-500'}`}>
                <td className="p-4 text-left">{index + 1}</td>
                <td className="p-4 text-left">{book.name}</td>
                <td className="p-4 text-left">{book.author}</td>
                <td className="p-4 text-left">{book.type}</td>
                <td className="p-4 text-left">
                  <button
                    onClick={() => toggleIssueBook(book.id)}
                    className={`px-4 py-2 rounded text-white ${book.isIssued ? "bg-red-500 hover:bg-red-700" : "bg-green-500 hover:bg-green-700"}`}
                  >
                    {book.isIssued ? "Return" : "Issue"}
                  </button>
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
