import React from 'react'
import { Link } from 'react-router-dom' 

const Signup = () => {
  return (
    <div className="min-h-screen bg-cover bg-center p-4 sm:p-8" style={{ backgroundImage: "url('Images/login.jpeg')" }}>
    <div className="container mx-auto px-4 py-8 bg-brown-800 bg-opacity-80 rounded-lg relative max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <div className="w-full mx-auto relative overflow-hidden">
        <div className="flex w-full relative" style={{ minHeight: '460px' }}>

         

          {/* Signup Form */}
          <div className={`absolute w-full transition-transform duration-700 ease-in-out transform `}>
            <div className="p-8 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-brown-700 text-center">Sign Up</h2>
              <form className="mt-4" >
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="fullName" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-brown-500"  />
                
                
                <label className="block text-sm font-medium text-gray-700 mt-4">Email</label>
                <input type="email" name="email" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-brown-500"  />
                
                
                <label className="block text-sm font-medium text-gray-700 mt-4">Password</label>
                <input type="password" name="password" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-brown-500"  />
               
                <button className="w-full bg-brown-600 hover:bg-brown-700 text-white font-bold py-2 px-4 rounded-lg mt-6">Sign Up</button>
              </form>
              <Link to="/login" className="text-sm text-center mt-4">
                Already have an account? <span className="text-brown-600 hover:text-brown-700 cursor-pointer" >Login</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  )
}

export default Signup
