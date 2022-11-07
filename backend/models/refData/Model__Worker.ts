import { Schema, model } from 'mongoose';

import { I_Worker } from '../../interfaces/AccountingInterfaces';

const worker__Schema = new Schema<I_Worker>({
  firstName: {
    type: String,
    required: [true, 'Please add a firstName name'],
  },
  patronymic: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Please add a lastName name'],
  },
  workerRole: {
    type: Schema.Types.ObjectId,
    ref: 'worker_role',
    required: [true, 'Please add a workerRole id'],
  },
  passportSeries: {
    type: String,
  },
  passportNumber: {
    type: String,
  },
  representedBy: {
    type: String,
  },
  whenIssued: {
    type: Date,
  },
  inn: {
    type: String,
    // unique: true,
    match: [/\b\d{10}\b/, 'Пожалуйста введите 10 цифр'],
  },
  birthDay: {
    type: Date,
  },
  telNumber: {
    type: String,
    required: [true, 'Please add a telNumber'],
  },
  email: {
    type: String,
    // unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Пожалуйста введите корректный email',
    ],
    // required: [true, 'Please add an email'],
  },
});

export default model('worker', worker__Schema);
