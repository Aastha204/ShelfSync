import React, { useState } from 'react'

const FileUpload = () => {
    const [file,setFile]=useState(null);
    const [filename,setFilename]=useState('Choose File');
    const [uploadFile,setUploadFile]=useState(null);
    
    const onChange=(e)=>{
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    const onSubmit =(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('myfile',file);
    }
  return (
    <div>
      
    </div>
  )
}

export default FileUpload
