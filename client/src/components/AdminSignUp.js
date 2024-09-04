import React from 'react'
import { Link, useNavigate } from 'react-router-dom' 
import {ToastContainer} from 'react-toastify'
import { useState } from 'react'
import { handleError, handleSuccess } from './utils'

const validateName = (name) => {
    const regex = /^[a-zA-Z]+(?:[.'-]?[a-zA-Z]+)(?: [a-zA-Z]+(?:[.'-]?[a-zA-Z]+))*$/;
    return regex.test(name);
  };

const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/;
    return regex.test(password);
  };
  
  // Email validation function
  const validateEmail = (email) => {
    const regex=/^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|yahoo\.com|hotmail\.com|live\.com|icloud\.com)$/;
    return regex.test(email);
  };

const Signup = () => {

    const [signupInfo,setSignupInfo]= useState(
        {
            name:'',
            email:'',
            password:''
        }
    )

    const navigate=useNavigate()
    const handleChange=(e)=>{
       const {name,value}=e.target;
       console.log(name,value);
       const copySignupInfo = {...signupInfo};
       copySignupInfo[name]=value;
       setSignupInfo(copySignupInfo)
    }

    console.log('loginInfo -> ',signupInfo);

    const handleSignup= async (e)=>{
        e.preventDefault();
        const {name,email,password}= signupInfo;
        if(!name || !email || !password){
            return handleError("name,email and password are required")
        }
        if (!validateName(name)) {
            return handleError("Name must contain only letters and spaces.");
          }
        
        if (!validatePassword(password)) {
            return handleError("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
          }
      
          if (!validateEmail(email)) {
            return handleError("Email must be a valid email");
          }
  
        try{
           const url = "http://localhost:3001/admin/signup";
           const response = await fetch(url,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(signupInfo)
           });
           const result = await response.json();
           const {success,message,error}=result;
           if(success){
            handleSuccess(message);
            setTimeout(()=>{
                navigate('/adminlogin');
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
    <div className="min-h-screen bg-cover bg-center p-4 sm:p-8">
    <video 
        autoPlay 
        muted 
        loop 
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/videos/library2.mp4" type="video/mp4" />
       
        Your browser does not support the video tag.
      </video>
    <div className="container mx-auto px-4 py-8 bg-brown-800 bg-opacity-80 rounded-lg relative max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <div className="w-full mx-auto relative overflow-hidden">
        <div className="flex w-full relative" style={{ minHeight: '460px' }}>

         

          {/* Signup Form */}
          <div className={`absolute w-full transition-transform duration-700 ease-in-out transform `}>
            <div className="p-8 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-brown-700 text-center">Sign Up</h2>
              <form className="mt-4" onSubmit={handleSignup}>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input onChange={handleChange} value={signupInfo.name} type="text" name="name" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-brown-500"  />
                
                
                <label className="block text-sm font-medium text-gray-700 mt-4">Email</label>
                <input type="email" value={signupInfo.email} onChange={handleChange} name="email" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-brown-500"  />
                
                
                <label className="block text-sm font-medium text-gray-700 mt-4">Password</label>
                <input type="password" value={signupInfo.password} onChange={handleChange} name="password" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-brown-500"  />
               
                <button type='submit' className="w-full bg-brown-600 hover:bg-brown-700 text-white font-bold py-2 px-4 rounded-lg mt-6">Sign Up</button>
              </form>
              <Link to="/adminlogin" className="text-sm text-center mt-4">
                Already have an account? <span className="text-brown-600 hover:text-brown-700 cursor-pointer" >Login</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
    <ToastContainer/>
  </div>
  )
}

export default Signup
