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
  birthDay: {
    type: Date,
  },
});

export default model('worker', worker__Schema);
