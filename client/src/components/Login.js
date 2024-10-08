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
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from './utils'
import { ToastContainer } from 'react-toastify';

const Login = () => {
  const [loginInfo,setLoginInfo]= useState(
    {
        
        email:'',
        password:''
    }
)

const navigate=useNavigate()
const handleChange=(e)=>{
   const {name,value}=e.target;
   console.log(name,value);
   const copyLoginInfo = {...loginInfo};
   copyLoginInfo[name]=value;
   setLoginInfo(copyLoginInfo)
}

console.log('loginInfo -> ',loginInfo);

const handleLogin= async (e)=>{
    e.preventDefault();
    const {email,password}= loginInfo;
    if(!email || !password){
        return handleError("email and password are required")
    }
    try{
       const url = "http://localhost:3001/auth/login";
       const response = await fetch(url,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(loginInfo)
       });
       const result = await response.json();
       const {success,message,jwtToken , name,error}=result;
       if(success){
        handleSuccess(message);
        localStorage.setItem('token',jwtToken);
        localStorage.setItem('loggedInUserName',name);
        localStorage.setItem('loggedInUserEmail',email);
        setTimeout(()=>{
          navigate('/userprofile');

        },1000)
       }
       else if(error){
        const details = error?.details[0].message;
        handleError(details)
       }
       else if(!success){
        handleError(message);
       }
       console.log(result)
    }catch(err){
        handleError(err)
    }
}

  return (

    <div className="min-h-screen bg-cover bg-center p-4 sm:p-8" >
      {/* Background Video */}
      <video 
        autoPlay 
        muted 
        loop 
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/videos/library2.mp4" type="video/mp4" />
       
        Your browser does not support the video tag.
      </video>
      <div className="container mx-auto px-4 py-8 bg-transparent-800 bg-opacity-40 rounded-lg relative max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <div className="w-full mx-auto relative overflow-hidden">
          <div className="flex w-full relative" style={{ minHeight: '460px' }}>

            {/* Login Form */}
            <div className={`absolute w-full transition-transform duration-700 ease-in-out transform `}>
              <div className="p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-5xl font-bold text-brown-700 text-center">Login</h2>
                <form className="mt-4" onSubmit={handleLogin}>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" name='email' onChange={handleChange} value={loginInfo.email} className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-brown-500" />
                  
                  <label className="block text-sm font-medium text-gray-700 mt-4">Password</label>
                  <input type="password" name='password' onChange={handleChange} value={loginInfo.password} className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-brown-500" />
                  
                  <button type='submit' className="w-full bg-brown-600 hover:bg-brown-700 text-white font-bold py-2 px-4 rounded-lg mt-6">Login</button>
                </form>

                <Link to="/signup" className="text-sm text-center mt-4">
                  Don't have an account? <span className="text-brown-600 hover:text-brown-700 cursor-pointer" >Sign up</span>
                </Link>

                
                
              </div>
            </div>

           

          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
