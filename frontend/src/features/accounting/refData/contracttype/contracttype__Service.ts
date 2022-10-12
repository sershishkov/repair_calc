import axios from 'axios';

import { I_ContractType } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

const API_URL = '/api/refdata/contracttype';

const contracttype__add = async (
  contracttype__Data: I_ContractType
): Promise<I_ContractType> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}`, contracttype__Data, config);

  return response.data.my_data;
};

const contracttype__update = async (
  contracttype__Data: I_ContractType
): Promise<I_ContractType> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const new__Obj = {
    contractTypeName: contracttype__Data.contractTypeName,
  };

  const response = await axios.put(
    `${API_URL}/${contracttype__Data._id}`,
    new__Obj,
    config
  );

  return response.data.my_data;
};

const contracttype__get_one = async (
  contracttype__Data: I_ContractType
): Promise<I_ContractType> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/${contracttype__Data._id}`,
    config
  );

  return response.data.my_data;
};

const contracttype__delete_one = async (
  contracttype__Data: I_ContractType
): Promise<I_ContractType> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${API_URL}/${contracttype__Data._id}`,
    config
  );

  return response.data.my_data;
};

const contracttype__get_all = async (
  contracttype__Data?: I_ContractType
): Promise<I_ServerResponse<I_ContractType>> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // console.log(contracttype__Data);

  const response = await axios.get(
    `${API_URL}/?page=${contracttype__Data?.page}&limit=${contracttype__Data?.limit}`,
    config
  );

  return response.data.my_data;
};

const current__Service = {
  contracttype__add,
  contracttype__update,
  contracttype__get_one,
  contracttype__delete_one,
  contracttype__get_all,
};

export default current__Service;
