import axios from 'axios';

import { I_PaymentSource } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

const API_URL = '/api/refdata/paymentsource';

const paymentsource__add = async (
  paymentsource__Data: I_PaymentSource
): Promise<I_PaymentSource> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}`, paymentsource__Data, config);

  return response.data.my_data;
};

const paymentsource__update = async (
  paymentsource__Data: I_PaymentSource
): Promise<I_PaymentSource> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const new__Obj = {
    paymentSourceName: paymentsource__Data.paymentSourceName,
  };

  const response = await axios.put(
    `${API_URL}/${paymentsource__Data._id}`,
    new__Obj,
    config
  );

  return response.data.my_data;
};

const paymentsource__get_one = async (
  paymentsource__Data: I_PaymentSource
): Promise<I_PaymentSource> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/${paymentsource__Data._id}`,
    config
  );

  return response.data.my_data;
};

const paymentsource__delete_one = async (
  paymentsource__Data: I_PaymentSource
): Promise<I_PaymentSource> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${API_URL}/${paymentsource__Data._id}`,
    config
  );

  return response.data.my_data;
};

const paymentsource__get_all = async (
  paymentsource__Data?: I_PaymentSource
): Promise<I_ServerResponse<I_PaymentSource>> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // console.log(paymentsource__Data);

  const response = await axios.get(
    `${API_URL}/?page=${paymentsource__Data?.page}&limit=${paymentsource__Data?.limit}`,
    config
  );

  return response.data.my_data;
};

const current__Service = {
  paymentsource__add,
  paymentsource__update,
  paymentsource__get_one,
  paymentsource__delete_one,
  paymentsource__get_all,
};

export default current__Service;
