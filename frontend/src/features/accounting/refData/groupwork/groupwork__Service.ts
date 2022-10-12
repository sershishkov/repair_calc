import axios from 'axios';

import { I_GroupWork } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

const API_URL = '/api/refdata/groupwork';

const groupwork__add = async (
  groupwork__Data: I_GroupWork
): Promise<I_GroupWork> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}`, groupwork__Data, config);

  return response.data.my_data;
};

const groupwork__update = async (
  groupwork__Data: I_GroupWork
): Promise<I_GroupWork> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const new__Obj = {
    groupWorkName: groupwork__Data.groupWorkName,
  };

  const response = await axios.put(
    `${API_URL}/${groupwork__Data._id}`,
    new__Obj,
    config
  );

  return response.data.my_data;
};

const groupwork__get_one = async (
  groupwork__Data: I_GroupWork
): Promise<I_GroupWork> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${groupwork__Data._id}`, config);

  return response.data.my_data;
};

const groupwork__delete_one = async (
  groupwork__Data: I_GroupWork
): Promise<I_GroupWork> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${API_URL}/${groupwork__Data._id}`,
    config
  );

  return response.data.my_data;
};

const groupwork__get_all = async (
  groupwork__Data?: I_GroupWork
): Promise<I_ServerResponse<I_GroupWork>> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // console.log(groupwork__Data);

  const response = await axios.get(
    `${API_URL}/?page=${groupwork__Data?.page}&limit=${groupwork__Data?.limit}`,
    config
  );

  return response.data.my_data;
};

const current__Service = {
  groupwork__add,
  groupwork__update,
  groupwork__get_one,
  groupwork__delete_one,
  groupwork__get_all,
};

export default current__Service;
