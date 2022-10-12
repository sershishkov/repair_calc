import axios from 'axios';

import { I_ClientType } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

const API_URL = '/api/refdata/clienttype';

const clienttype__add = async (
  clienttype__Data: I_ClientType
): Promise<I_ClientType> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}`, clienttype__Data, config);

  return response.data.my_data;
};

const clienttype__update = async (
  clienttype__Data: I_ClientType
): Promise<I_ClientType> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const new__Obj = {
    clientTypeName: clienttype__Data.clientTypeName,
  };

  const response = await axios.put(
    `${API_URL}/${clienttype__Data._id}`,
    new__Obj,
    config
  );

  return response.data.my_data;
};

const clienttype__get_one = async (
  clienttype__Data: I_ClientType
): Promise<I_ClientType> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/${clienttype__Data._id}`,
    config
  );

  return response.data.my_data;
};

const clienttype__delete_one = async (
  clienttype__Data: I_ClientType
): Promise<I_ClientType> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${API_URL}/${clienttype__Data._id}`,
    config
  );

  return response.data.my_data;
};

const clienttype__get_all = async (
  clienttype__Data?: I_ClientType
): Promise<I_ServerResponse<I_ClientType>> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // console.log(clienttype__Data);

  const response = await axios.get(
    `${API_URL}/?page=${clienttype__Data?.page}&limit=${clienttype__Data?.limit}`,
    config
  );

  return response.data.my_data;
};

const current__Service = {
  clienttype__add,
  clienttype__update,
  clienttype__get_one,
  clienttype__delete_one,
  clienttype__get_all,
};

export default current__Service;
