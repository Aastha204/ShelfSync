import React from 'react'
import '../index.css';
const Invoice = () => {
  return (
    <div className="min-h-screen bg-brown-500 flex justify-center items-center py-10">
      <div className="bg-white w-full max-w-4xl md:max-w-2xl sm:max-w-md border-4 border-brown-600 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row px-6 py-4 border-b-2 border-brown-600">
          <div>
            <h2 className="text-2xl font-bold text-brown-700">Receipt</h2>
            <p className="text-sm text-gray-500">From</p>
            <p className="text-sm text-gray-700">_____________</p>
          </div>
          <div className="text-right mt-4 sm:mt-0">
            <p className="text-sm text-gray-500">Receipt No.</p>
            <p className="text-sm text-gray-700">_____________</p>
            <p className="text-sm text-gray-500 mt-2">Borrower's Name</p>
            <p className="text-sm text-gray-700">_____________</p>
            
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          {/* <div className="mb-4">
            <label className="block text-sm text-gray-500">Amount</label>
            <p className="border-b border-brown-400 w-full mt-2"></p>
          </div> */}
          {/* <div className="mb-4">
            <label className="block text-sm text-gray-500">In words</label>
            <p className="border-b border-brown-400 w-full mt-2"></p>
          </div> */}
          <div className="mb-4">
            <label className="block text-sm text-gray-500">Book Name</label>
            <p className="border-b border-brown-400 w-full mt-2"></p>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-500">Book Author Name</label>
            <p className="border-b border-brown-400 w-full mt-2"></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-500">Issue Date</label>
              <p className="border-b border-brown-400 w-full mt-2"></p>
            </div>
            <div>
              <label className="block text-sm text-gray-500">Return Date</label>
              <p className="border-b border-brown-400 w-full mt-2"></p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t-2 border-brown-600 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="text-sm text-gray-600">
            <p>ShelfSync@gmail.com</p>
            <p>+91 1234567890</p>
            <p>Chitkara University, Rajpura, Punjab</p>
          </div>
          <div className="text-right mt-4 sm:mt-0">
            <p className="font-semibold text-gray-700"></p>
            <p className="border-b border-brown-400 w-40 mt-2"></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Invoice;
