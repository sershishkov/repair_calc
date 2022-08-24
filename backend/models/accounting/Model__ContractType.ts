import { Schema, model } from 'mongoose';

import { I_ContractType } from '../../interfaces/AccountingInterfaces';

const contract_type__Schema = new Schema<I_ContractType>({
  contractTypeName: {
    type: String,
    required: [true, 'Please add a contract_type name'],
  },
});

export default model('contract_type', contract_type__Schema);
