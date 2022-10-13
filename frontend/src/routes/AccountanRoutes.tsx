import React from 'react';
import { Route } from 'react-router-dom';

import PrivateRoute from '../components/layout/PrivateRoute';

import { seller_role } from '../constants/constants';

const Dashboard = React.lazy(() => import('../pages/Dashboard'));

const AddUnit = React.lazy(
  () => import('../pages/accounting/refData/unit/AddUnit')
);
const EditUnit = React.lazy(
  () => import('../pages/accounting/refData/unit/EditUnit')
);
const ListUnit = React.lazy(
  () => import('../pages/accounting/refData/unit/ListUnit')
);

const AddFirmType = React.lazy(
  () => import('../pages/accounting/refData/firmtype/AddFirmType')
);
const EditFirmType = React.lazy(
  () => import('../pages/accounting/refData/firmtype/EditFirmType')
);
const ListFirmType = React.lazy(
  () => import('../pages/accounting/refData/firmtype/ListFirmType')
);

const AddClientType = React.lazy(
  () => import('../pages/accounting/refData/clienttype/AddClientType')
);
const EditClientType = React.lazy(
  () => import('../pages/accounting/refData/clienttype/EditClientType')
);
const ListClientType = React.lazy(
  () => import('../pages/accounting/refData/clienttype/ListClientType')
);

const AddContractType = React.lazy(
  () => import('../pages/accounting/refData/contracttype/AddContractType')
);
const EditContractType = React.lazy(
  () => import('../pages/accounting/refData/contracttype/EditContractType')
);
const ListContractType = React.lazy(
  () => import('../pages/accounting/refData/contracttype/ListContractType')
);

const AddGroupExpense = React.lazy(
  () => import('../pages/accounting/refData/groupexpense/AddGroupExpense')
);
const EditGroupExpense = React.lazy(
  () => import('../pages/accounting/refData/groupexpense/EditGroupExpense')
);
const ListGroupExpense = React.lazy(
  () => import('../pages/accounting/refData/groupexpense/ListGroupExpense')
);

const AddGroupProduct = React.lazy(
  () => import('../pages/accounting/refData/groupproduct/AddGroupProduct')
);
const EditGroupProduct = React.lazy(
  () => import('../pages/accounting/refData/groupproduct/EditGroupProduct')
);
const ListGroupProduct = React.lazy(
  () => import('../pages/accounting/refData/groupproduct/ListGroupProduct')
);

const AddGroupWork = React.lazy(
  () => import('../pages/accounting/refData/groupwork/AddGroupWork')
);
const EditGroupWork = React.lazy(
  () => import('../pages/accounting/refData/groupwork/EditGroupWork')
);
const ListGroupWork = React.lazy(
  () => import('../pages/accounting/refData/groupwork/ListGroupWork')
);

const AddPaymentSource = React.lazy(
  () => import('../pages/accounting/refData/paymentsource/AddPaymentSource')
);
const EditPaymentSource = React.lazy(
  () => import('../pages/accounting/refData/paymentsource/EditPaymentSource')
);
const ListPaymentSource = React.lazy(
  () => import('../pages/accounting/refData/paymentsource/ListPaymentSource')
);

const AddProductType = React.lazy(
  () => import('../pages/accounting/refData/producttype/AddProductType')
);
const EditProductType = React.lazy(
  () => import('../pages/accounting/refData/producttype/EditProductType')
);
const ListProductType = React.lazy(
  () => import('../pages/accounting/refData/producttype/ListProductType')
);

const AddTaxationType = React.lazy(
  () => import('../pages/accounting/refData/taxationtype/AddTaxationType')
);
const EditTaxationType = React.lazy(
  () => import('../pages/accounting/refData/taxationtype/EditTaxationType')
);
const ListTaxationType = React.lazy(
  () => import('../pages/accounting/refData/taxationtype/ListTaxationType')
);

const AddWorkerRole = React.lazy(
  () => import('../pages/accounting/refData/workerrole/AddWorkerRole')
);
const EditWorkerRole = React.lazy(
  () => import('../pages/accounting/refData/workerrole/EditWorkerRole')
);
const ListWorkerRole = React.lazy(
  () => import('../pages/accounting/refData/workerrole/ListWorkerRole')
);

const AccountanRoutes = () => {
  return (
    <Route path='/refdata' element={<PrivateRoute roles={seller_role} />}>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/unit' element={<ListUnit />} />
      <Route path='/unit/add' element={<AddUnit />} />
      <Route path='/unit/:id' element={<EditUnit />} />
      <Route path='/firmtype/:id' element={<EditFirmType />} />
      <Route path='/firmtype/add' element={<AddFirmType />} />
      <Route path='/firmtype' element={<ListFirmType />} />
      <Route path='/clienttype/add' element={<AddClientType />} />
      <Route path='/clienttype/:id' element={<EditClientType />} />
      <Route path='/clienttype' element={<ListClientType />} />
      <Route path='/contracttype/add' element={<AddContractType />} />
      <Route path='/contracttype/:id' element={<EditContractType />} />
      <Route path='/contracttype' element={<ListContractType />} />
      <Route path='/groupexpense/add' element={<AddGroupExpense />} />
      <Route path='/groupexpense/:id' element={<EditGroupExpense />} />
      <Route path='/groupexpense' element={<ListGroupExpense />} />
      <Route path='/groupproduct/add' element={<AddGroupProduct />} />
      <Route path='/groupproduct/:id' element={<EditGroupProduct />} />
      <Route path='/groupproduct' element={<ListGroupProduct />} />
      <Route path='/groupwork/add' element={<AddGroupWork />} />
      <Route path='/groupwork/:id' element={<EditGroupWork />} />
      <Route path='/groupwork' element={<ListGroupWork />} />
      <Route path='/paymentsource/add' element={<AddPaymentSource />} />
      <Route path='/paymentsource/:id' element={<EditPaymentSource />} />
      <Route path='/paymentsource' element={<ListPaymentSource />} />
      <Route path='/producttype/add' element={<AddProductType />} />
      <Route path='/producttype/:id' element={<EditProductType />} />
      <Route path='/producttype' element={<ListProductType />} />
      <Route path='/taxationtype/add' element={<AddTaxationType />} />
      <Route path='/taxationtype/:id' element={<EditTaxationType />} />
      <Route path='/taxationtype' element={<ListTaxationType />} />
      <Route path='/workerrole/add' element={<AddWorkerRole />} />
      <Route path='/workerrole/:id' element={<EditWorkerRole />} />
      <Route path='/workerrole' element={<ListWorkerRole />} />
    </Route>
  );
};

export default AccountanRoutes;
