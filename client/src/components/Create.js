import React, { useState } from 'react';
import axios from 'axios';
import '../styles/create.css'; 

const Create = ({ onTaskAdded }) => {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (task && description) {
      axios
        .post('http://localhost:3001/todos/add', { task, description })
        .then((result) => {
          setTask(''); // Clear the task input
          setDescription(''); // Clear the description input
          onTaskAdded(result.data); // Update Home.js with the new task
        })
        .catch((err) => console.log(err));
    } else {
      alert('Please fill in both the task and description fields.');
    }
  };

  return (
    <div className="create-task-container">
      <input
        className="input1"
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        className="input1"
        type="text"
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="button" className="button1" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};

export default Create;
