import express from 'express';
const router = express.Router();

import router__Auth from './user/router__Auth';
import router__User from './user/router__User';

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
import router__StoreHouse from './refData/router__StoreHouse';
import router__GroupThirdPartyService from './refData/router__GroupThirdPartyService';
import router__ThirdPartyService from './refData/router__ThirdPartyService';

import router__SalaryPayment from './accounting/router__SalaryPayment';
import router__Expense from './accounting/router__Expense';
import router__BankIncome from './accounting/router__BankIncome';
import router__PaymentToSupplier from './accounting/router__PaymentToSupplier';
import router__DocumentNakladnaya from './accounting/router__DocumentNakladnaya';
import router__DocumentAktOfWork from './accounting/router__DocumentAktOfWork';

router.use('/auth', router__Auth);
router.use('/user-admin', router__User);

router.use('/refdata/unit', router__Unit);
router.use('/refdata/firmtype', router__FirmType);
router.use('/refdata/taxationtype', router__TaxationType);
router.use('/refdata/groupwork', router__GroupWork);
router.use('/refdata/groupproduct', router__GroupProduct);
router.use('/refdata/workerrole', router__WorkerRole);
router.use('/refdata/contracttype', router__ContractType);
router.use('/refdata/paymentsource', router__PaymentSource);
router.use('/refdata/groupexpense', router__GroupExpense);
router.use('/refdata/clienttype', router__ClientType);
router.use('/refdata/producttype', router__ProductType);
router.use('/refdata/clients', router__Client);
router.use('/refdata/contract', router__Contract);
router.use('/refdata/worker', router__Worker);
router.use('/refdata/products', router__Product);
router.use('/refdata/servicework', router__ServiceWork);
router.use('/refdata/storehouse', router__StoreHouse);
router.use('/refdata/group-thirdparty-service', router__GroupThirdPartyService);
router.use('/refdata/thirdparty-service', router__ThirdPartyService);

router.use('/accounting/salarypayment', router__SalaryPayment);
router.use('/accounting/expense', router__Expense);
router.use('/accounting/bankincome', router__BankIncome);
router.use('/accounting/paymenttosupplier', router__PaymentToSupplier);
router.use('/accounting/documentnakladnaya', router__DocumentNakladnaya);
router.use('/accounting/documentaktofwork', router__DocumentAktOfWork);

export default router;
