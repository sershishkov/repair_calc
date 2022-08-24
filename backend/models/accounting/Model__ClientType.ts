import { Schema, model } from 'mongoose';

import { I_ClientType } from '../../interfaces/AccountingInterfaces';

const client_type__Schema = new Schema<I_ClientType>({
  clientTypeName: {
    type: String,
    required: [true, 'Please add a client_type name'],
  },
});

export default model('client_type', client_type__Schema);
