import { Schema, model } from 'mongoose';

import { I_WorkerRole } from '../../interfaces/AccountingInterfaces';

const worker_role__Schema = new Schema<I_WorkerRole>({
  workerRoleName: {
    type: String,
    required: [true, 'Please add a worker_role name'],
    unique: true,
  },
});

export default model('worker_role', worker_role__Schema);
