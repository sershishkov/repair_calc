import { Schema, model } from 'mongoose';

import { I_PaymentSource } from '../../interfaces/AccountingInterfaces';

const payment_source__Schema = new Schema<I_PaymentSource>({
  paymentSourceName: {
    type: String,
    required: [true, 'Please add a payment_source name'],
  },
});

export default model('payment_source', payment_source__Schema);
