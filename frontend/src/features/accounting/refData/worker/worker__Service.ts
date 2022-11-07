import axios from 'axios';

import { I_Worker } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

const API_URL = '/api/refdata/worker';

const item__add = async (dataObject: I_Worker): Promise<I_Worker> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}`, dataObject, config);

  return response.data.my_data;
};

const item__update = async (dataObject: I_Worker): Promise<I_Worker> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { _id } = dataObject;
  delete dataObject._id;

  const response = await axios.put(`${API_URL}/${_id}`, dataObject, config);

  return response.data.my_data;
};

const item__get_one = async (dataObject: I_Worker): Promise<I_Worker> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${dataObject._id}`, config);

  return response.data.my_data;
};

const item__delete_one = async (dataObject: I_Worker): Promise<I_Worker> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${dataObject._id}`, config);

  return response.data.my_data;
};

const item__get_all = async (
  dataObject?: I_Worker
): Promise<I_ServerResponse<I_Worker>> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // console.log(dataObject);

  const response = await axios.get(
    `${API_URL}/?page=${dataObject?.page}&limit=${dataObject?.limit}`,
    config
  );

  return response.data.my_data;
};

const current__Service = {
  item__add,
  item__update,
  item__get_one,
  item__delete_one,
  item__get_all,
};

export default current__Service;
