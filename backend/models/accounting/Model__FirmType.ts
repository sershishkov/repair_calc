import { Schema, model } from 'mongoose';

import { I_firmType } from '../../interfaces/AccountingInterfaces';

const firm_type__Schema = new Schema<I_firmType>({
  nameTypeLong: {
    type: String,
    required: [true, 'Please add a firm_type name'],
  },
  nameTypeShort: {
    type: String,
    // required: [true, 'Please add a firmtype shortname'],
  },
});

export default model('firm_type', firm_type__Schema);
