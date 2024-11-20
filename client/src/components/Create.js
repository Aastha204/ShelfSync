import React, { useState } from 'react';
import axios from 'axios';
import '../styles/create.css'; 

const Create = ({ onTaskAdded }) => {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (task) {
      axios.post("http://localhost:3001/todos/add", { task })
        .then(result => {
          setTask(''); // Clear the input
          onTaskAdded(result.data); // Update Home.js with the new task
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div>
      <input
        className='input1'
        type="text"
        placeholder='Enter Task'
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type='button' className='button1' onClick={handleAdd}>Add</button>
    </div>
  );
};

export default Create;
