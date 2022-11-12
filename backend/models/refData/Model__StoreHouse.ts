import { Schema, model } from 'mongoose';

import { I_StoreHouse } from '../../interfaces/AccountingInterfaces';

const storehouse__Schema = new Schema<I_StoreHouse>({
  storeHouseName: {
    type: String,
    required: [true, 'Please add a storehouse name'],
    unique: true,
  },
  address: {
    type: String,
    required: [true, 'Please add a storehouse name'],
  },
});

export default model('storehouse', storehouse__Schema);
