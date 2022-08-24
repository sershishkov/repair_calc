import { Schema, model } from 'mongoose';

import { I_BankIncome } from '../../interfaces/AccountingInterfaces';

const unit__Schema = new Schema<I_BankIncome>({
  ourFirm: {
    type: Schema.Types.ObjectId,
    ref: 'client',
    required: [true, 'Please add a ourFirm id'],
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'client',
    required: [true, 'Please add a client id'],
  },
  contract: {
    type: Schema.Types.ObjectId,
    ref: 'contract',
    required: [true, 'Please add a contract id'],
  },
  paymentSum: {
    type: Number,
    required: [true, 'Please add an paymentSum'],
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
});

export default model('unit', unit__Schema);
