import { Schema, model } from 'mongoose';

import { I_GroupThirdPartyService } from '../../interfaces/AccountingInterfaces';

const group_third_party_service__Schema = new Schema<I_GroupThirdPartyService>({
  groupThirdPartyServiceName: {
    type: String,
    required: [true, 'Please add a group_third_party_service name'],
    unique: true,
  },
});

export default model(
  'group_third_party_service',
  group_third_party_service__Schema
);
