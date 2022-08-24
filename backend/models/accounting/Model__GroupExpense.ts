import { Schema, model } from 'mongoose';

import { I_GroupExpense } from '../../interfaces/AccountingInterfaces';

const group_expense__Schema = new Schema<I_GroupExpense>({
  groupExpenseName: {
    type: String,
    required: [true, 'Please add a group_expense name'],
    unique: true,
  },
});

export default model('group_expense', group_expense__Schema);
