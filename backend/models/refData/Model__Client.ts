import { Schema, model } from 'mongoose';

import { I_Client } from '../../interfaces/AccountingInterfaces';

const client__Schema = new Schema<I_Client>({
  nameClientLong: {
    type: String,
    required: [true, 'Please add a client long name'],
    unique: true,
  },
  nameClientShort: {
    type: String,
    required: [true, 'Please add a client short name'],
  },
  firmType: {
    type: Schema.Types.ObjectId,
    ref: 'firm_type',
    required: [true, 'Please add a client name'],
  },
  postIndex: {
    type: String,
    required: [true, 'Please add a post index'],
    match: [/\b\d{5}\b/, 'Индекс может состоять только из 5 цифр'],
  },
  address: {
    type: String,
    required: [true, 'Please add an address'],
  },
  edrpou: {
    type: String,
    // unique: true,
    // match: [/\b\d{8}\b/, 'Пожалуйста введите 8 цифр'],
    // required: [true, 'Please add an edrpou'],
  },
  inn: {
    type: String,
    // unique: true,
    // match: [/\b\d{10}\b/, 'Пожалуйста введите 10 цифр'],
    // required: [true, 'Please add an inn'],
  },
  iban: {
    type: String,
    // unique: true,
    // required: [true, 'Please add an iban'],
  },
  iban_budget: {
    type: String,
    // unique: true,
    // required: [true, 'Please add a iban_budget'],
  },
  passport: {
    type: String,
    // unique: true,
    // required: [true, 'Please add a passport'],
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
    // unique: true,
    // required: [true, 'Please add a certificateNumber'],
  },
  representedBy: {
    type: String,
    // required: [true, 'Please add a representedBy'],
  },
  whichActsOnTheBasis: {
    type: String,
  },
  jobTitle: {
    type: String,
    // required: [true, 'Please add a jobTitle'],
  },
  jobTitle_rodit: {
    type: String,
    // required: [true, 'Please add a jobTitle'],
  },
  tax: {
    type: Number,
    default: 0,
    // required: [true, 'Please add a tax'],
  },
  taxationType: {
    type: Schema.Types.ObjectId,
    ref: 'taxation_type',
  },
  certificate_PDV: {
    type: String,
    // unique: true,
  },
  telNumber: {
    type: String,
    required: [true, 'Please add a telNumber'],
  },
  email: {
    type: String,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Пожалуйста введите корректный email',
    ],
    required: [true, 'Please add an email'],
  },
  clientType: {
    type: [Schema.Types.ObjectId],
    ref: 'client_type',
    required: [true, 'Please add a clientType id'],
  },
});

export default model('client', client__Schema);
