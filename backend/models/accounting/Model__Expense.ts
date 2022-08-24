import { Schema, model } from 'mongoose';

import { I_Expense } from '../../interfaces/AccountingInterfaces';

const expense__Schema = new Schema<I_Expense>({
  expenseDescription: {
    type: String,
    required: [true, 'Please add a expenseDescription'],
  },
  groupExpense: {
    type: Schema.Types.ObjectId,
    ref: 'group_expense',
    required: [true, 'Please add a groupExpense id'],
  },
  expenseSum: {
    type: Number,
    required: [true, 'Please add an expenseSum'],
  },
  expenseDate: {
    type: Date,
    default: Date.now,
  },
  responsiblePerson: {
    type: Schema.Types.ObjectId,
    ref: 'worker',
    required: [true, 'Please add a responsiblePerson id'],
  },
});

export default model('expense', expense__Schema);
