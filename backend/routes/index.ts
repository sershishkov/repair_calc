import express from 'express';
const router = express.Router();

import authRoutes from './user/authRoutes';

import router__Unit from './refData/router__Unit';
import router__FirmType from './refData/router__FirmType';
import router__TaxationType from './refData/router__TaxationType';
import router__GroupWork from './refData/router__GroupWork';
import router__GroupProduct from './refData/router__GroupProduct';
import router__WorkerRole from './refData/router__WorkerRole';
import router__ContractType from './refData/router__ContractType';
import router__PaymentSource from './refData/router__PaymentSource';
import router__GroupExpense from './refData/router__GroupExpense';
import router__ClientType from './refData/router__ClientType';
import router__ProductType from './refData/router__ProductType';
import router__Client from './refData/router__Client';
import router__Contract from './refData/router__Contract';
import router__Worker from './refData/router__Worker';
import router__Product from './refData/router__Product';
import router__ServiceWork from './refData/router__ServiceWork';

import router__SalaryPayment from './accounting/router__SalaryPayment';

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
router.use('/accounting/producttype', router__ProductType);
router.use('/accounting/clients', router__Client);
router.use('/accounting/contract', router__Contract);
router.use('/accounting/worker', router__Worker);
router.use('/accounting/products', router__Product);
router.use('/accounting/servicework', router__ServiceWork);

router.use('/accounting/salarypayment', router__SalaryPayment);

export default router;
