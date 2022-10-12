import axios from 'axios';

import { I_GroupExpense } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

const API_URL = '/api/refdata/groupexpense';

const groupexpense__add = async (
  groupexpense__Data: I_GroupExpense
): Promise<I_GroupExpense> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}`, groupexpense__Data, config);

  return response.data.my_data;
};

const groupexpense__update = async (
  groupexpense__Data: I_GroupExpense
): Promise<I_GroupExpense> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const new__Obj = {
    groupExpenseName: groupexpense__Data.groupExpenseName,
  };

  const response = await axios.put(
    `${API_URL}/${groupexpense__Data._id}`,
    new__Obj,
    config
  );

  return response.data.my_data;
};

const groupexpense__get_one = async (
  groupexpense__Data: I_GroupExpense
): Promise<I_GroupExpense> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/${groupexpense__Data._id}`,
    config
  );

  return response.data.my_data;
};

const groupexpense__delete_one = async (
  groupexpense__Data: I_GroupExpense
): Promise<I_GroupExpense> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${API_URL}/${groupexpense__Data._id}`,
    config
  );

  return response.data.my_data;
};

const groupexpense__get_all = async (
  groupexpense__Data?: I_GroupExpense
): Promise<I_ServerResponse<I_GroupExpense>> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // console.log(groupexpense__Data);

  const response = await axios.get(
    `${API_URL}/?page=${groupexpense__Data?.page}&limit=${groupexpense__Data?.limit}`,
    config
  );

  return response.data.my_data;
};

const current__Service = {
  groupexpense__add,
  groupexpense__update,
  groupexpense__get_one,
  groupexpense__delete_one,
  groupexpense__get_all,
};

export default current__Service;
