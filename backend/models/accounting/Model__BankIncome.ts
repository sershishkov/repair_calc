import { Schema, model } from 'mongoose';

import { I_BankIncome } from '../../interfaces/AccountingInterfaces';

const bank_income__Schema = new Schema<I_BankIncome>({
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

export default model('bank_income', bank_income__Schema);
