import { Schema, model } from 'mongoose';

import { I_StoreHouse } from '../../interfaces/AccountingInterfaces';

const storehouse__Schema = new Schema<I_StoreHouse>(
  {
    storeHouseName: {
      type: String,
      required: [true, 'Please add a storehouse name'],
      unique: true,
    },
    address: {
      type: String,
      required: [true, 'Please add a storehouse name'],
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'product',
          required: [true, 'Please add a product id'],
        },
        amount: {
          type: Number,
          default: 0,
        },
        priceBuy_inStore: {
          type: Number,
          default: 0,
        },
        rowSum: {
          type: Number,
          default: function () {
            return (this.amount * this.priceBuy_inStore).toFixed(2);
          },
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

storehouse__Schema.virtual('totalStoreSum').get(function () {
  let totalStoreSum = 0;

  this.products.forEach((item) => {
    totalStoreSum += item.amount * item.priceBuy_inStore;
  });
  return totalStoreSum.toFixed(2);
});

export default model('storehouse', storehouse__Schema);
