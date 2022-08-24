import { Schema, model } from 'mongoose';

import { I_SalaryPayment } from '../../interfaces/AccountingInterfaces';

const salary_payment__Schema = new Schema<I_SalaryPayment>({
  worker: {
    type: Schema.Types.ObjectId,
    ref: 'worker',
    required: [true, 'Please add a worker id'],
  },
  paymentSum: {
    type: Number,
    required: [true, 'Please add a paymentSum'],
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  contract: {
    type: Schema.Types.ObjectId,
    ref: 'contract',
    required: [true, 'Please add a contract id'],
  },
});

export default model('salary_payment', salary_payment__Schema);
