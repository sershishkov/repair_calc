import axios from 'axios';

import { I_UserAuth } from '../../interfaces/UserInterfaces';

const API_URL = '/api/auth';

// Register user
const register = async (userData: I_UserAuth) => {
  const responseToken = await axios.post(`${API_URL}/register`, userData);
  const token = responseToken.data.token;
  console.log('token', token);

  if (token) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const responseUser = await axios.get(`${API_URL}/me`, config);

  const user = responseUser.data;
  return user ? user : null;
};

const login = async (userData: I_UserAuth) => {
  const responseToken = await axios.post(`${API_URL}/login`, userData);
  const token = responseToken.data.token;

  if (token) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const responseUser = await axios.get(`${API_URL}/me`, config);

  const user = responseUser.data;
  return user ? user : null;
};

const getMe = async () => {
  const token = JSON.parse(localStorage.getItem('token')!);
  // console.log('getMe', token);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const responseUser = await axios.get(`${API_URL}/me`, config);

  const user = responseUser.data;
  return user ? user : null;
};

const logout = async () => {
  localStorage.removeItem('token');
};

const authService = {
  register,
  login,
  logout,
  getMe,
};

export default authService;
