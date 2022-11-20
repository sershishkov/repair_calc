import { Schema, model } from 'mongoose';

import { I_ThirdPartyService } from '../../interfaces/AccountingInterfaces';

const third_party_service__Schema = new Schema<I_ThirdPartyService>({
  thirdPartyServiceName: {
    type: String,
    required: [true, 'Please add a unit name'],
    unique: true,
  },
  unit: {
    type: Schema.Types.ObjectId,
    ref: 'unit',
    required: [true, 'Please add a unit id'],
  },
  groupThirdPartyService: {
    type: [Schema.Types.ObjectId],
    ref: 'group_third_party_service',
    required: [true, 'Please add a group_third_party_service id'],
  },
  priceBuyRecommend: {
    type: Number,
    default: 1,
  },
});

export default model('third_party_service', third_party_service__Schema);
