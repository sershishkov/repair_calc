import { Schema, model } from 'mongoose';

import { I_Work } from '../../interfaces/AccountingInterfaces';

const work__Schema = new Schema<I_Work>({
  workName: {
    type: String,
    required: [true, 'Please add a work name'],
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
  priceWorker: {
    type: Number,
    required: [true, 'Please add a priceWorker'],
  },
  priceClient: {
    type: Number,
    // required: [true, 'Please add a priceWorker'],
  },
});

export default model('work', work__Schema);
