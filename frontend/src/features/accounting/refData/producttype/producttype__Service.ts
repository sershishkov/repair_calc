import axios from 'axios';

import { I_ProductType } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

const API_URL = '/api/refdata/producttype';

const producttype__add = async (
  producttype__Data: I_ProductType
): Promise<I_ProductType> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}`, producttype__Data, config);

  return response.data.my_data;
};

const producttype__update = async (
  producttype__Data: I_ProductType
): Promise<I_ProductType> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const new__Obj = {
    productTypeName: producttype__Data.productTypeName,
  };

  const response = await axios.put(
    `${API_URL}/${producttype__Data._id}`,
    new__Obj,
    config
  );

  return response.data.my_data;
};

const producttype__get_one = async (
  producttype__Data: I_ProductType
): Promise<I_ProductType> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/${producttype__Data._id}`,
    config
  );

  return response.data.my_data;
};

const producttype__delete_one = async (
  producttype__Data: I_ProductType
): Promise<I_ProductType> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${API_URL}/${producttype__Data._id}`,
    config
  );

  return response.data.my_data;
};

const producttype__get_all = async (
  producttype__Data?: I_ProductType
): Promise<I_ServerResponse<I_ProductType>> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // console.log(producttype__Data);

  const response = await axios.get(
    `${API_URL}/?page=${producttype__Data?.page}&limit=${producttype__Data?.limit}`,
    config
  );

  return response.data.my_data;
};

const current__Service = {
  producttype__add,
  producttype__update,
  producttype__get_one,
  producttype__delete_one,
  producttype__get_all,
};

export default current__Service;
