import { Schema, model } from 'mongoose';

import { I_ServiceWork } from '../../interfaces/AccountingInterfaces';

const service_work__Schema = new Schema<I_ServiceWork>({
  serviceWorkName: {
    type: String,
    required: [true, 'Please add a work name'],
    unique: true,
  },
  unit: {
    type: Schema.Types.ObjectId,
    ref: 'unit',
    required: [true, 'Please add a unit id'],
  },
  groupWork: {
    type: [Schema.Types.ObjectId],
    ref: 'group_work',
    required: [true, 'Please add a group_work id'],
  },
  priceWorkerRecommend: {
    type: Number,
    required: [true, 'Please add a priceWorker'],
  },
  priceClientRecommend: {
    type: Number,
    // required: [true, 'Please add a priceWorker'],
  },
  products: {
    type: [Schema.Types.ObjectId],
    ref: 'product',
  },
  equipmentAndTools: {
    type: [Schema.Types.ObjectId],
    ref: 'product',
  },
});

export default model('service_work', service_work__Schema);
