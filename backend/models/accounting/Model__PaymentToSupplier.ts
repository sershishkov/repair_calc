import { Schema, model } from 'mongoose';

import { I_PaymentToSupplier } from '../../interfaces/AccountingInterfaces';

const payment_to_supplier__Schema = new Schema<I_PaymentToSupplier>({
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

export default model('payment_to_supplier', payment_to_supplier__Schema);
