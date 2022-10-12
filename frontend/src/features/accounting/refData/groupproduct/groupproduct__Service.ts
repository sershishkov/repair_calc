import axios from 'axios';

import { I_GroupProduct } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

const API_URL = '/api/refdata/groupproduct';

const groupproduct__add = async (
  groupproduct__Data: I_GroupProduct
): Promise<I_GroupProduct> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}`, groupproduct__Data, config);

  return response.data.my_data;
};

const groupproduct__update = async (
  groupproduct__Data: I_GroupProduct
): Promise<I_GroupProduct> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const new__Obj = {
    groupProductName: groupproduct__Data.groupProductName,
  };

  const response = await axios.put(
    `${API_URL}/${groupproduct__Data._id}`,
    new__Obj,
    config
  );

  return response.data.my_data;
};

const groupproduct__get_one = async (
  groupproduct__Data: I_GroupProduct
): Promise<I_GroupProduct> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/${groupproduct__Data._id}`,
    config
  );

  return response.data.my_data;
};

const groupproduct__delete_one = async (
  groupproduct__Data: I_GroupProduct
): Promise<I_GroupProduct> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${API_URL}/${groupproduct__Data._id}`,
    config
  );

  return response.data.my_data;
};

const groupproduct__get_all = async (
  groupproduct__Data?: I_GroupProduct
): Promise<I_ServerResponse<I_GroupProduct>> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // console.log(groupproduct__Data);

  const response = await axios.get(
    `${API_URL}/?page=${groupproduct__Data?.page}&limit=${groupproduct__Data?.limit}`,
    config
  );

  return response.data.my_data;
};

const current__Service = {
  groupproduct__add,
  groupproduct__update,
  groupproduct__get_one,
  groupproduct__delete_one,
  groupproduct__get_all,
};

export default current__Service;
