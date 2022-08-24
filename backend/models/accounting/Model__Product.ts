import { Schema, model } from 'mongoose';

import { I_Product } from '../../interfaces/AccountingInterfaces';

const product__Schema = new Schema<I_Product>({
  productName: {
    type: String,
    required: [true, 'Please add a unit name'],
  },
  unit: {
    type: Schema.Types.ObjectId,
    ref: 'unit',
    required: [true, 'Please add a unit id'],
  },
  groupProduct: {
    type: [Schema.Types.ObjectId],
    ref: 'group_product',
    required: [true, 'Please add a group_product id'],
  },
  priceBuy: {
    type: Number,
    required: [true, 'Please add a priceBuy'],
  },
  priceSell: {
    type: Number,
    // required: [true, 'Please add a priceSell'],
  },
  normPerOne: {
    type: Number,
    default: 1,
  },
  amountInPackage: {
    type: Number,
    default: 1,
  },
  weight: {
    type: Number,
  },
  height: {
    type: Number,
  },
  width: {
    type: Number,
  },
  length: {
    type: Number,
  },
});

export default model('product', product__Schema);
