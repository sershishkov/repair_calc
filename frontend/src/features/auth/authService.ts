import axios from 'axios';

import { I_AuthRequest, I_AuthResponse } from '../../interfaces/UserInterfaces';

const API_URL = '/api/auth';

// Register user
const register = async (
  userData: I_AuthRequest
): Promise<I_AuthResponse | null> => {
  const responseToken = await axios.post(`${API_URL}/register`, userData);
  const token = responseToken.data.token;
  // console.log('token', token);

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

const login = async (
  userData: I_AuthRequest
): Promise<I_AuthResponse | null> => {
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

const getMe = async (): Promise<I_AuthResponse | null> => {
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

// Update user Details
const updateDetails = async (userData: I_AuthRequest) => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.put(`${API_URL}/updatedetails`, userData, config);
};

// Update user Details
const updatePassword = async (userData: I_AuthRequest) => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.put(`${API_URL}/updatepassword`, userData, config);
};

const current__Service = {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword,
};

export default current__Service;
