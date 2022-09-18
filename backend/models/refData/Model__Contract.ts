import { Schema, model } from 'mongoose';

import { I_Contract } from '../../interfaces/AccountingInterfaces';

const contract__Schema = new Schema<I_Contract>({
  ourFirm: {
    type: Schema.Types.ObjectId,
    ref: 'client',
    required: [true, 'Please add a workerRole id'],
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'client',
    required: [true, 'Please add a workerRole id'],
  },
  contractNumber: {
    type: String,
    required: [true, 'Please add a contractNumber'],
    unique: true,
  },
  contractDate: {
    type: Date,
    // required: [true, 'Please add a contractDate'],
    default: Date.now,
  },
  contractDescription: {
    type: String,
    required: [true, 'Please add a contractDescription'],
  },
  workAddress: {
    type: String,
    required: [true, 'Please add a workAddress'],
  },
  contractType: {
    type: Schema.Types.ObjectId,
    ref: 'contract_type',
    required: [true, 'Please add a workerRole id'],
  },
  paymentSource: {
    type: Schema.Types.ObjectId,
    ref: 'payment_source',
    required: [true, 'Please add a workerRole id'],
  },
});

export default model('contract', contract__Schema);
