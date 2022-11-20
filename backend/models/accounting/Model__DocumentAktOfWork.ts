import { Schema, model } from 'mongoose';

import { I_DocumentAktOfWork } from '../../interfaces/AccountingInterfaces';

const document_act_of_work__Schema = new Schema<I_DocumentAktOfWork>(
  {
    aktOfWorkNumber: {
      type: String,
      unique: true,
      required: [true, 'Please add an act_of_workNumber'],
    },
    aktOfWorkDate: {
      type: Date,
      default: Date.now,
    },
    contract: {
      type: Schema.Types.ObjectId,
      ref: 'contract',
      required: [true, 'Please add a contract id'],
    },
    thirdPartyServices: [
      {
        thirdPartyService: {
          type: Schema.Types.ObjectId,
          ref: 'third_party_service',
          // unique: true,
          required: [true, 'Please add a third_party_service id'],
        },
        amount: {
          type: Number,
          required: [true, 'Введите количество'],
        },
        priceServiceEntered: {
          type: Number,
          default: 1,
        },
        priceServiceSell: {
          type: Number,
          default: 1,
        },
        rowSumServiceEntered: {
          type: Number,
          default: function () {
            return (this.amount * this.priceServiceEntered).toFixed(2);
          },
        },
        rowSumServiceSell: {
          type: Number,
          default: function () {
            return (this.amount * this.priceServiceSell).toFixed(2);
          },
        },
        enteredContract: {
          type: Schema.Types.ObjectId,
          ref: 'contract',
          required: [true, 'Please add a contract id'],
        },
      },
    ],
    serviceWorks: [
      {
        serviceWork: {
          type: Schema.Types.ObjectId,
          ref: 'service_work',
          // unique: true,
          required: [true, 'Please add a service_work id'],
        },
        amount: {
          type: Number,
          required: [true, 'Введите количество'],
        },
        priceWorkWoker: {
          type: Number,
          default: 1,
        },
        priceWorkSell: {
          type: Number,
          default: 1,
        },
        rowSumWorkWoker: {
          type: Number,
          default: function () {
            return (this.amount * this.priceWorkWoker).toFixed(2);
          },
        },
        rowSumWorkSell: {
          type: Number,
          default: function () {
            return (this.amount * this.priceWorkSell).toFixed(2);
          },
        },
        worker: {
          type: Schema.Types.ObjectId,
          ref: 'worker',
          required: [true, 'Please add a worker id'],
        },
      },
    ],

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
      enum: ['incoming', 'outgoing'],
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

document_act_of_work__Schema.virtual('totalAktSums').get(function () {
  let totalthirdPartySumBuy = 0;
  let totalthirdPartySumSell = 0;
  let serviceWorkSumBuy = 0;
  let serviceWorkSumSell = 0;
  this.thirdPartyServices.forEach((item) => {
    totalthirdPartySumBuy += item.amount * item.priceServiceEntered;
    totalthirdPartySumSell += item.amount * item.priceServiceSell;
  });
  this.serviceWorks.forEach((item) => {
    serviceWorkSumBuy += item.amount * item.priceWorkWoker;
    serviceWorkSumSell += item.amount * item.priceWorkSell;
  });
  return {
    totalthirdPartySumBuy: totalthirdPartySumBuy.toFixed(2),
    totalthirdPartySumSell: totalthirdPartySumSell.toFixed(2),
    serviceWorkSumBuy: serviceWorkSumBuy.toFixed(2),
    serviceWorkSumSell: serviceWorkSumSell.toFixed(2),
    totalSumBuy: (totalthirdPartySumBuy + serviceWorkSumBuy).toFixed(2),
    totalSumSell: (totalthirdPartySumSell + serviceWorkSumSell).toFixed(2),
  };
});

export default model('document_act_of_work', document_act_of_work__Schema);
