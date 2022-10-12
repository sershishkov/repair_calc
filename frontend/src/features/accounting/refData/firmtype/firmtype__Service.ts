import axios from 'axios';

import { I_FirmType } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

const API_URL = '/api/refdata/firmtype';

const firmtype__add = async (
  firmtype__Data: I_FirmType
): Promise<I_FirmType> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}`, firmtype__Data, config);

  return response.data.my_data;
};

const firmtype__update = async (
  firmtype__Data: I_FirmType
): Promise<I_FirmType> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const new__Obj = {
    nameTypeLong: firmtype__Data.nameTypeLong,
    nameTypeShort: firmtype__Data.nameTypeShort,
  };

  const response = await axios.put(
    `${API_URL}/${firmtype__Data._id}`,
    new__Obj,
    config
  );

  return response.data.my_data;
};

const firmtype__get_one = async (
  firmtype__Data: I_FirmType
): Promise<I_FirmType> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${firmtype__Data._id}`, config);

  return response.data.my_data;
};

const firmtype__delete_one = async (
  firmtype__Data: I_FirmType
): Promise<I_FirmType> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${API_URL}/${firmtype__Data._id}`,
    config
  );

  return response.data.my_data;
};

const firmtype__get_all = async (
  firmtype__Data?: I_FirmType
): Promise<I_ServerResponse<I_FirmType>> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // console.log(firmtype__Data);

  const response = await axios.get(
    `${API_URL}/?page=${firmtype__Data?.page}&limit=${firmtype__Data?.limit}`,
    config
  );

  return response.data.my_data;
};

const current__Service = {
  firmtype__add,
  firmtype__update,
  firmtype__get_one,
  firmtype__delete_one,
  firmtype__get_all,
};

export default current__Service;
