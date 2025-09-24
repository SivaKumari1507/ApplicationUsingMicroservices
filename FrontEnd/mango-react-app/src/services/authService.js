import axios from 'axios';

const AUTH_API_BASE = 'http://localhost:5015/api/auth'; // Use HTTPS for Auth API

export const registerUser = (userData) =>
  axios.post(`${AUTH_API_BASE}/register`, userData);

export const loginUser = (loginData) =>
  axios.post(`${AUTH_API_BASE}/login`, loginData);

export const assignRole = (roleData) =>
  axios.post(`${AUTH_API_BASE}/AssignRole`, roleData);
