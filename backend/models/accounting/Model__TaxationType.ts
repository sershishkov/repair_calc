import { Schema, model } from 'mongoose';

import { I_TaxationType } from '../../interfaces/AccountingInterfaces';

const taxation_type__Schema = new Schema<I_TaxationType>({
  taxationTypeName: {
    type: String,
    required: [true, 'Please add a taxation_type name'],
  },
});

export default model('taxation_type', taxation_type__Schema);
