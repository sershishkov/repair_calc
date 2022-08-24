import { Schema, model } from 'mongoose';

import { I_GroupWork } from '../../interfaces/AccountingInterfaces';

const group_work__Schema = new Schema<I_GroupWork>({
  groupWorkName: {
    type: String,
    required: [true, 'Please add a group_work name'],
  },
});

export default model('group_work', group_work__Schema);
