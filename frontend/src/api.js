import axios from 'axios';

// Base API URL (Flask backend)
const API_URL = "http://127.0.0.1:5000";

// Register a new user
export const register = (userData) => axios.post(`${API_URL}/register`, userData);

// Login and get JWT token
export const login = (userData) => axios.post(`${API_URL}/login`, userData);

// Get all tasks (protected route)
export const getTasks = (token) => axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` }
});

// Create a new task (protected route)
export const createTask = (taskData, token) => axios.post(`${API_URL}/tasks`, taskData, {
    headers: { Authorization: `Bearer ${token}` }
});

// Mark task as completed (protected route)
export const completeTask = (taskId, token) => axios.put(`${API_URL}/tasks/${taskId}`, {}, {
    headers: { Authorization: `Bearer ${token}` }
});

// Delete a task (protected route)
export const deleteTask = (taskId, token) => axios.delete(`${API_URL}/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` }
});
