import { Schema, model } from 'mongoose';

import { I_DocumentNakladnaya } from '../../interfaces/AccountingInterfaces';

const document_nakladnaya__Schema = new Schema<I_DocumentNakladnaya>(
  {
    nakladnayaNumber: {
      type: String,
      unique: true,
      required: [true, 'Please add an nakladnayaNumber'],
    },
    nakladnayaDate: {
      type: Date,
      default: Date.now,
    },
    contract: {
      type: Schema.Types.ObjectId,
      ref: 'contract',
      required: [true, 'Please add a contract id'],
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'product',
          // unique: true,
          required: [true, 'Please add a product id'],
        },
        amount: {
          type: Number,
          required: [true, 'Введите количество'],
        },
        priceBuy: {
          type: Number,
          default: 0,
        },
        priceSell: {
          type: Number,
          default: 0,
        },
        rowSumBuy: {
          type: Number,
          default: function () {
            return (this.amount * this.priceBuy).toFixed(2);
          },
        },
        rowSumSell: {
          type: Number,
          default: function () {
            return (this.amount * this.priceSell).toFixed(2);
          },
        },
      },
    ],
    storeHouse: {
      type: Schema.Types.ObjectId,
      ref: 'storehouse',
      required: [true, 'Please add a storehouse id'],
    },
    active: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Please add a user id'],
    },
    typeNakl: {
      type: String,
      enum: ['incoming', 'outgoing', 'returnFromBuyer', 'returnToSupplier'],
    },

    deleted: {
      type: Boolean,
      default: false,
    },

    whoDeleted: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

document_nakladnaya__Schema.virtual('totalNaklSums').get(function () {
  let totalNaklSumBuy = 0;
  let totalNaklSumSell = 0;
  this.products.forEach((item) => {
    totalNaklSumBuy += item.amount * item.priceBuy;
    totalNaklSumSell += item.amount * item.priceSell;
  });
  return {
    totalNaklSumBuy: totalNaklSumBuy.toFixed(2),
    totalNaklSumSell: totalNaklSumSell.toFixed(2),
    incomeWithTax: (totalNaklSumSell - totalNaklSumBuy).toFixed(2),
  };
});

export default model('document_nakladnaya', document_nakladnaya__Schema);
