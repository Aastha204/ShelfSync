import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#3e1302] w-full p-12 text-white flex justify-between items-start space-x-12'>
      <div>
        <h2 className='font-bold mb-4 text-lg text-white-400'>Let us help you</h2>
        <p className='mb-2 hover:text-yellow-300 cursor-pointer'>Your account</p>
        <p className='hover:text-yellow-300 cursor-pointer'>Your Books</p>
      </div>
      <div>
        <h2 className='font-bold mb-4 text-lg text-white-400'>Contact us</h2>
        <p className='mb-2 hover:text-yellow-300 cursor-pointer'>+91 1234567890</p>
        <p className='hover:text-yellow-300 cursor-pointer'>+91 1234567890</p>
      </div>
      <div>
        <h2 className='font-bold mb-4 text-lg text-white-400'>Address</h2>
        <p className='mb-2'>Delhi</p>
        <p>India</p>
      </div>
    </div>
  )
}

export default Footer
