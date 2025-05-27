import React, { useState } from 'react';

const TaskInput = ({ addTask }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('General');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTask({
      id: Date.now(),
      text,
      category,
      completed: false
    });
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task..."
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>General</option>
        <option>Work</option>
        <option>Study</option>
        <option>Personal</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskInput;
