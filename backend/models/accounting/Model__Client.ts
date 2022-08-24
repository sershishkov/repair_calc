import { Schema, model } from 'mongoose';

import { I_Client } from '../../interfaces/AccountingInterfaces';

const client__Schema = new Schema<I_Client>({
  nameClientLong: {
    type: String,
    required: [true, 'Please add a client name'],
  },
  nameClientShort: {
    type: String,
    // required: [true, 'Please add a client name'],
  },
  firmType: {
    type: Schema.Types.ObjectId,
    ref: 'firm_type',
    // required: [true, 'Please add a client name'],
  },
  postIndex: {
    type: Number,
    required: [true, 'Please add a post index'],
  },
  address: {
    type: String,
    required: [true, 'Please add an address'],
  },
  edrpou: {
    type: Number,
    // required: [true, 'Please add a client name'],
  },
  inn: {
    type: Number,
    // required: [true, 'Please add a client name'],
  },
  iban: {
    type: Number,
    // required: [true, 'Please add a client name'],
  },
  iban_budget: {
    type: Number,
    // required: [true, 'Please add a client name'],
  },
  passport: {
    type: String,
    // required: [true, 'Please add a client name'],
  },
  firstName_imen: {
    type: String,
    required: [true, 'Please add a first name im'],
  },
  patronymic_imen: {
    type: String,
    required: [true, 'Please add a patronymic im'],
  },
  lastName_imen: {
    type: String,
    required: [true, 'Please add a last name im'],
  },

  firstName_rodit: {
    type: String,
    required: [true, 'Please add a first name rod'],
  },
  patronymic_rodit: {
    type: String,
    required: [true, 'Please add a patronymic rod'],
  },
  lastName_rodit: {
    type: String,
    required: [true, 'Please add a last name rod'],
  },

  certificateNumber: {
    type: String,
    // required: [true, 'Please add a certificateNumber'],
  },
  representedBy: {
    type: String,
    // required: [true, 'Please add a representedBy'],
  },
  jobTitle: {
    type: String,
    // required: [true, 'Please add a jobTitle'],
  },
  tax: {
    type: Number,
    // required: [true, 'Please add a tax'],
  },
  taxationType: {
    type: Schema.Types.ObjectId,
    ref: 'taxation_type',
  },
  telNumber: {
    type: String,
    // required: [true, 'Please add a telNumber'],
  },
  email: {
    type: String,
    // required: [true, 'Please add an email'],
  },
  clientType: {
    type: [Schema.Types.ObjectId],
    ref: 'client_type',
    required: [true, 'Please add a clientType id'],
  },
});

export default model('client', client__Schema);
