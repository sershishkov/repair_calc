import express from 'express';
const router = express.Router();

import authRoutes from './user/authRoutes';
import router__Unit from './accounting/router__Unit';
import router__FirmType from './accounting/router__FirmType';
import router__TaxationType from './accounting/router__TaxationType';
import router__GroupWork from './accounting/router__GroupWork';
import router__GroupProduct from './accounting/router__GroupProduct';
import router__WorkerRole from './accounting/router__WorkerRole';
import router__ContractType from './accounting/router__ContractType';
import router__PaymentSource from './accounting/router__PaymentSource';
import router__GroupExpense from './accounting/router__GroupExpense';
import router__ClientType from './accounting/router__ClientType';
import router__Client from './accounting/router__Client';
import router__Contract from './accounting/router__Contract';

router.use('/auth', authRoutes);

router.use('/accounting/unit', router__Unit);
router.use('/accounting/firmtype', router__FirmType);
router.use('/accounting/taxationtype', router__TaxationType);
router.use('/accounting/groupwork', router__GroupWork);
router.use('/accounting/groupproduct', router__GroupProduct);
router.use('/accounting/workerrole', router__WorkerRole);
router.use('/accounting/contracttype', router__ContractType);
router.use('/accounting/paymentsource', router__PaymentSource);
router.use('/accounting/groupexpense', router__GroupExpense);
router.use('/accounting/clienttype', router__ClientType);

router.use('/accounting/clients', router__Client);
router.use('/accounting/contract', router__Contract);

export default router;
