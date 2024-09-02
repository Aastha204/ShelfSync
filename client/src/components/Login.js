// import React, { useState } from 'react';
// import { FaUserAlt, FaLock } from "react-icons/fa";
// import '../App.css'; // Adjust the path based on your project structure

// const Login = () => {
//   const [isLogin, setIsLogin] = useState(true);

//   const toggleForm = () => {
//     setIsLogin(!isLogin);
//   };

//   return (
//     <div className="min-h-screen bg-cover bg-center p-4 sm:p-8" style={{ backgroundImage: "url('Images/LibraryAuth.jpeg')" }}>
//       <div className="container mx-auto px-4 py-8 bg-brown-800 bg-opacity-80 rounded-lg relative max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
//         <div className="w-full mx-auto relative overflow-hidden">
//           <div className="flex w-full relative" style={{ minHeight: '460px' }}>

//             {/* Login Form */}
//             <div className={`absolute w-full transition-transform duration-700 ease-in-out transform ${isLogin ? 'translate-x-0' : '-translate-x-full'}`}>
//               <div className="p-8 bg-white rounded-lg shadow-lg">
//                 <h2 className="text-2xl font-bold text-brown-700 text-center">Login</h2>
//                 <form className="mt-4">
//                   <label className="block text-sm font-medium text-gray-700">Email</label>
//                   <input type="email" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-brown-500" />
                  
//                   <label className="block text-sm font-medium text-gray-700 mt-4">Password</label>
//                   <input type="password" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-brown-500" />
                  
//                   <button className="w-full bg-brown-600 hover:bg-brown-700 text-white font-bold py-2 px-4 rounded-lg mt-6">Login</button>
//                 </form>
//                 <p className="text-sm text-center mt-4">
//                   Don't have an account? <span className="text-brown-600 hover:text-brown-700 cursor-pointer" onClick={toggleForm}>Sign up</span>
//                 </p>
//               </div>
//             </div>

//             {/* Signup Form */}
//             <div className={`absolute w-full transition-transform duration-700 ease-in-out transform ${!isLogin ? 'translate-x-0' : 'translate-x-full'}`}>
//               <div className="p-8 bg-white rounded-lg shadow-lg">
//                 <h2 className="text-2xl font-bold text-brown-700 text-center">Sign Up</h2>
//                 <form className="mt-4">
//                   <label className="block text-sm font-medium text-gray-700">Full Name</label>
//                   <input type="text" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-brown-500" />
                  
//                   <label className="block text-sm font-medium text-gray-700 mt-4">Email</label>
//                   <input type="email" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-brown-500" />
                  
//                   <label className="block text-sm font-medium text-gray-700 mt-4">Password</label>
//                   <input type="password" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-brown-500" />
                  
//                   <button className="w-full bg-brown-600 hover:bg-brown-700 text-white font-bold py-2 px-4 rounded-lg mt-6">Sign Up</button>
//                 </form>
//                 <p className="text-sm text-center mt-4">
//                   Already have an account? <span className="text-brown-600 hover:text-brown-700 cursor-pointer" onClick={toggleForm}>Login</span>
//                 </p>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { FaUserAlt, FaLock } from "react-icons/fa";
import '../App.css'; // Adjust the path based on your project structure
import {Link} from 'react-router-dom';

const Login = () => {
  

  return (

    <div className="min-h-screen bg-cover bg-center p-4 sm:p-8" style={{ backgroundImage: "url('images/login.jpeg')" }}>

      <div className="container mx-auto px-4 py-8 bg-transparent-800 bg-opacity-40 rounded-lg relative max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <div className="w-full mx-auto relative overflow-hidden">
          <div className="flex w-full relative" style={{ minHeight: '460px' }}>

            {/* Login Form */}
            <div className={`absolute w-full transition-transform duration-700 ease-in-out transform `}>
              <div className="p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-5xl font-bold text-brown-700 text-center">Login</h2>
                <form className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-brown-500" />
                  
                  <label className="block text-sm font-medium text-gray-700 mt-4">Password</label>
                  <input type="password" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-brown-500" />
                  
                  <button className="w-full bg-brown-600 hover:bg-brown-700 text-white font-bold py-2 px-4 rounded-lg mt-6">Login</button>
                </form>

                <Link to="/signup" className="text-sm text-center mt-4">
                  Don't have an account? <span className="text-brown-600 hover:text-brown-700 cursor-pointer" >Sign up</span>
                </Link>

                
                
              </div>
            </div>

           

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
