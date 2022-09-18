import { Schema, model } from 'mongoose';

import { I_GroupProduct } from '../../interfaces/AccountingInterfaces';

const group_product__Schema = new Schema<I_GroupProduct>({
  groupProductName: {
    type: String,
    required: [true, 'Please add a group_product name'],
    unique: true,
  },
});

export default model('group_product', group_product__Schema);
