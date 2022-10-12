import axios from 'axios';

import { I_WorkerRole } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

const API_URL = '/api/refdata/workerrole';

const workerrole__add = async (
  workerrole__Data: I_WorkerRole
): Promise<I_WorkerRole> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}`, workerrole__Data, config);

  return response.data.my_data;
};

const workerrole__update = async (
  workerrole__Data: I_WorkerRole
): Promise<I_WorkerRole> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const new__Obj = {
    workerRoleName: workerrole__Data.workerRoleName,
  };

  const response = await axios.put(
    `${API_URL}/${workerrole__Data._id}`,
    new__Obj,
    config
  );

  return response.data.my_data;
};

const workerrole__get_one = async (
  workerrole__Data: I_WorkerRole
): Promise<I_WorkerRole> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/${workerrole__Data._id}`,
    config
  );

  return response.data.my_data;
};

const workerrole__delete_one = async (
  workerrole__Data: I_WorkerRole
): Promise<I_WorkerRole> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${API_URL}/${workerrole__Data._id}`,
    config
  );

  return response.data.my_data;
};

const workerrole__get_all = async (
  workerrole__Data?: I_WorkerRole
): Promise<I_ServerResponse<I_WorkerRole>> => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // console.log(workerrole__Data);

  const response = await axios.get(
    `${API_URL}/?page=${workerrole__Data?.page}&limit=${workerrole__Data?.limit}`,
    config
  );

  return response.data.my_data;
};

const current__Service = {
  workerrole__add,
  workerrole__update,
  workerrole__get_one,
  workerrole__delete_one,
  workerrole__get_all,
};

export default current__Service;
