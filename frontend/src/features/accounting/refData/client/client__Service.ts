import axios from 'axios';

import { I_Client } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

const API_URL = '/api/refdata/client';

const client__add = async (client__Data: I_Client): Promise<I_Client> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}`, client__Data, config);

  return response.data.my_data;
};

const client__update = async (client__Data: I_Client): Promise<I_Client> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const new__Obj = {
    nameClientLong: client__Data.nameClientLong,
    nameClientShort: client__Data.nameClientShort,

    firmType: client__Data.firmType,
    // firmTypeLong: client__Data.firmTypeLong,
    // firmTypeShort: client__Data.firmTypeShort,

    postIndex: client__Data.postIndex,
    address: client__Data.address,
    edrpou: client__Data.edrpou,
    inn: client__Data.inn,
    iban: client__Data.iban,
    iban_budget: client__Data.iban_budget,

    passport: client__Data.passport,
    firstName_imen: client__Data.firstName_imen,
    patronymic_imen: client__Data.patronymic_imen,
    lastName_imen: client__Data.lastName_imen,
    firstName_rodit: client__Data.firstName_rodit,
    patronymic_rodit: client__Data.patronymic_rodit,
    lastName_rodit: client__Data.lastName_rodit,

    certificateNumber: client__Data.certificateNumber,
    representedBy: client__Data.representedBy,

    jobTitle: client__Data.jobTitle,
    tax: client__Data.tax,
    taxationType: client__Data.taxationType,
    // taxationTypeName: client__Data.taxationTypeName,
    telNumber: client__Data.telNumber,
    email: client__Data.email,
  };

  const response = await axios.put(
    `${API_URL}/${client__Data._id}`,
    new__Obj,
    config
  );

  return response.data.my_data;
};

const client__get_one = async (client__Data: I_Client): Promise<I_Client> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${client__Data._id}`, config);

  return response.data.my_data;
};

const client__delete_one = async (
  client__Data: I_Client
): Promise<I_Client> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${client__Data._id}`, config);

  return response.data.my_data;
};

const client__get_all = async (
  client__Data?: I_Client
): Promise<I_ServerResponse<I_Client>> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // console.log(client__Data);

  const response = await axios.get(
    `${API_URL}/?page=${client__Data?.page}&limit=${client__Data?.limit}`,
    config
  );

  return response.data.my_data;
};

const current__Service = {
  client__add,
  client__update,
  client__get_one,
  client__delete_one,
  client__get_all,
};

export default current__Service;
