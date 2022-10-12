import axios from 'axios';

import { I_TaxationType } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

const API_URL = '/api/refdata/taxationtype';

const taxationtype__add = async (
  taxationtype__Data: I_TaxationType
): Promise<I_TaxationType> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}`, taxationtype__Data, config);

  return response.data.my_data;
};

const taxationtype__update = async (
  taxationtype__Data: I_TaxationType
): Promise<I_TaxationType> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const new__Obj = {
    taxationTypeName: taxationtype__Data.taxationTypeName,
  };

  const response = await axios.put(
    `${API_URL}/${taxationtype__Data._id}`,
    new__Obj,
    config
  );

  return response.data.my_data;
};

const taxationtype__get_one = async (
  taxationtype__Data: I_TaxationType
): Promise<I_TaxationType> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/${taxationtype__Data._id}`,
    config
  );

  return response.data.my_data;
};

const taxationtype__delete_one = async (
  taxationtype__Data: I_TaxationType
): Promise<I_TaxationType> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${API_URL}/${taxationtype__Data._id}`,
    config
  );

  return response.data.my_data;
};

const taxationtype__get_all = async (
  taxationtype__Data?: I_TaxationType
): Promise<I_ServerResponse<I_TaxationType>> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // console.log(taxationtype__Data);

  const response = await axios.get(
    `${API_URL}/?page=${taxationtype__Data?.page}&limit=${taxationtype__Data?.limit}`,
    config
  );

  return response.data.my_data;
};

const current__Service = {
  taxationtype__add,
  taxationtype__update,
  taxationtype__get_one,
  taxationtype__delete_one,
  taxationtype__get_all,
};

export default current__Service;
