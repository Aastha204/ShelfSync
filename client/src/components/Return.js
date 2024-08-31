import React,{useState} from 'react'

const Return = () => {

    const [books, setBooks] = useState([
        { id: 1, name: "The Great Gatsby", author: "F. Scott Fitzgerald", type: "Fiction" },
        { id: 2, name: "Sapiens", author: "Yuval Noah Harari", type: "Non-fiction" },
        { id: 3, name: "Harry Potter", author: "J.K. Rowling", type: "Fantasy" },
      ]);


  return (
    <div className="min-h-screen bg-cover bg-center p-8" style={{ backgroundImage: "url('Images/LibraryReturn.jpeg')" }}>
      <div className="container mx-auto px-4 py-8 bg-brown-800 bg-opacity-80 rounded-lg">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Return Books</h1>
        <table className="min-w-full border-collapse bg-brown-600 rounded-lg overflow-hidden">
          <thead className="bg-brown-700 text-white">
            <tr>
              <th className="p-4 text-left bg-brown-700">S.No.</th>
              <th className="p-4 text-left bg-brown-700">Book Name</th>
              <th className="p-4 text-left bg-brown-700">Author Name</th>
              <th className="p-4 text-left bg-brown-700">Book Type</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {books.map((book, index) => (
              <tr key={book.id} className={`bg-brown-500 ${index % 2 === 0 ? 'bg-brown-400' : 'bg-brown-600'} hover:bg-brown-700`}>
                <td className="p-4 text-left">{index + 1}</td>
                <td className="p-4 text-left">{book.name}</td>
                <td className="p-4 text-left">{book.author}</td>
                <td className="p-4 text-left">{book.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Return
