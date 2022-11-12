import { Schema, model } from 'mongoose';

import { I_DocumentNakladnaya } from '../../interfaces/AccountingInterfaces';

const document_nakladnaya__Schema = new Schema<I_DocumentNakladnaya>(
  {
    nakladnayaNumber: {
      type: String,
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
          required: [true, 'Please add a product id'],
        },
        additionalDescription: String,
        amount: {
          type: Number,
          required: [true, 'Введите количество'],
        },
        priceBuy: {
          type: Number,
          required: [true, 'Введите закупочную цену товара'],
        },
        priceSell: {
          type: Number,
          required: [true, 'Введите продажную цену товара'],
        },
        rowSum: {
          type: Number,
          required: [true, 'Введите сумму по строке'],
        },
        priceSell_changed: {
          type: Number,
          default: 0,
        },
        rowSum_changed: {
          type: Number,
          default: 0,
        },
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Please add a user id'],
    },
    incomingOrOutgoingDoc: {
      type: String,
      enum: ['incoming', 'outgoing'],
      default: 'outgoing',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

document_nakladnaya__Schema.virtual('totalNaklSums').get(function () {
  let totalNaklSum = 0;
  let totalNaklSumChanged = 0;
  this.products.forEach((item) => {
    totalNaklSum += item.amount * item.priceSell;
    totalNaklSumChanged += item.amount * item.priceSell_changed;
  });
  return {
    totalNaklSum: totalNaklSum.toFixed(2),
    totalNaklSumChanged: totalNaklSumChanged.toFixed(2),
  };
});

export default model('document_nakladnaya', document_nakladnaya__Schema);
