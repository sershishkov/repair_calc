import axios from 'axios';

import { I_AuthRequest, I_AuthResponse } from '../../interfaces/UserInterfaces';
import { I_ServerResponse } from '../../interfaces/CommonInterfaces';

const API_URL = '/api/user-admin';

const user__add = async (
  user__Data: I_AuthRequest
): Promise<I_AuthResponse | null> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}`, user__Data, config);

  return response.data.my_data;
};

const user__update = async (
  user__Data: I_AuthRequest
): Promise<I_AuthResponse | null> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const new__Obj = {
    name: user__Data.name,
    email: user__Data.email,
    password: user__Data.password,
    role: user__Data.role,
  };

  const response = await axios.put(
    `${API_URL}/${user__Data._id}`,
    new__Obj,
    config
  );

  return response.data.my_data;
};

const user__get_one = async (
  user__Data: I_AuthRequest
): Promise<I_AuthResponse | null> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${user__Data._id}`, config);

  return response.data.my_data;
};

const user__delete_one = async (
  user__Data: I_AuthRequest
): Promise<I_AuthResponse | null> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${user__Data._id}`, config);

  return response.data.my_data;
};

const user__get_all = async (
  user__Data?: I_AuthRequest
): Promise<I_ServerResponse<I_AuthResponse> | null> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(user__Data);

  const response = await axios.get(
    `${API_URL}/?page=${user__Data?.page}&limit=${user__Data?.limit}`,
    config
  );

  return response.data.my_data;
};

const authService = {
  user__add,
  user__update,
  user__get_one,
  user__delete_one,
  user__get_all,
};

export default authService;
