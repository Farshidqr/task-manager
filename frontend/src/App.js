import React, { useState, useEffect } from 'react';
import { register, login, getTasks, createTask } from './api';

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    await register({ username, password });
    alert("User registered!");
  };

  const handleLogin = async () => {
    const res = await login({ username, password });
    setUser(res.data.access_token);
    fetchTasks(res.data.access_token);
  };

  const fetchTasks = async (token) => {
    const res = await getTasks(token);
    setTasks(res.data);
  };

  const handleCreateTask = async () => {
    await createTask({ title: taskTitle }, user);
    fetchTasks(user);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Task Manager</h1>
      {!user ? (
        <>
          <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <>
          <h2>Your Tasks</h2>
          <input placeholder="Task Title" onChange={(e) => setTaskTitle(e.target.value)} />
          <button onClick={handleCreateTask}>Add Task</button>
          {tasks.map((task) => (
            <p key={task.id}>{task.title}</p>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
