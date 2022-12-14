import React from 'react';

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

const AddClient = React.lazy(
  () => import('../pages/accounting/refData/client/AddClient')
);
const EditClient = React.lazy(
  () => import('../pages/accounting/refData/client/EditClient')
);
const ListClient = React.lazy(
  () => import('../pages/accounting/refData/client/ListClient')
);

const AddContract = React.lazy(
  () => import('../pages/accounting/refData/contract/AddContract')
);
const EditContract = React.lazy(
  () => import('../pages/accounting/refData/contract/EditContract')
);
const ListContract = React.lazy(
  () => import('../pages/accounting/refData/contract/ListContract')
);

const AddWorker = React.lazy(
  () => import('../pages/accounting/refData/worker/AddWorker')
);
const EditWorker = React.lazy(
  () => import('../pages/accounting/refData/worker/EditWorker')
);
const ListWorker = React.lazy(
  () => import('../pages/accounting/refData/worker/ListWorker')
);

const AddProduct = React.lazy(
  () => import('../pages/accounting/refData/product/AddProduct')
);
const EditProduct = React.lazy(
  () => import('../pages/accounting/refData/product/EditProduct')
);
const ListProduct = React.lazy(
  () => import('../pages/accounting/refData/product/ListProduct')
);

const AddServiceWork = React.lazy(
  () => import('../pages/accounting/refData/servicework/AddServiceWork')
);
const EditServiceWork = React.lazy(
  () => import('../pages/accounting/refData/servicework/EditServiceWork')
);
const ListServiceWork = React.lazy(
  () => import('../pages/accounting/refData/servicework/ListServiceWork')
);
const AddStoreHouse = React.lazy(
  () => import('../pages/accounting/refData/storehouse/AddStoreHouse')
);
const EditStoreHouse = React.lazy(
  () => import('../pages/accounting/refData/storehouse/EditStoreHouse')
);
const ListStoreHouse = React.lazy(
  () => import('../pages/accounting/refData/storehouse/ListStoreHouse')
);

const AddGrThPartyServ = React.lazy(
  () =>
    import(
      '../pages/accounting/refData/group-thirdparty-service/AddGrThPartyServ'
    )
);
const EditGrThPartyServ = React.lazy(
  () =>
    import(
      '../pages/accounting/refData/group-thirdparty-service/EditGrThPartyServ'
    )
);
const ListGrThPartyServ = React.lazy(
  () =>
    import(
      '../pages/accounting/refData/group-thirdparty-service/ListGrThPartyServ'
    )
);

const AddThirdPartyServ = React.lazy(
  () =>
    import('../pages/accounting/refData/thirdparty-service/AddThirdPartyServ')
);
const EditThirdPartyServ = React.lazy(
  () =>
    import('../pages/accounting/refData/thirdparty-service/EditThirdPartyServ')
);
const ListThirdPartyServ = React.lazy(
  () =>
    import('../pages/accounting/refData/thirdparty-service/ListThirdPartyServ')
);

const AddDocNakl = React.lazy(
  () => import('../pages/accounting/accountant/documentnakladnaya/AddDocNakl')
);
const EditDocNakl = React.lazy(
  () => import('../pages/accounting/accountant/documentnakladnaya/EditDocNakl')
);
const ListDocNakl = React.lazy(
  () => import('../pages/accounting/accountant/documentnakladnaya/ListDocNakl')
);

export const SellerRoutes = [
  { path: '/dashboard', component: <Dashboard /> },
  // gg
  { path: '/refdata/unit', component: <ListUnit /> },
  { path: '/refdata/unit/add', component: <AddUnit /> },
  { path: '/refdata/unit/:id', component: <EditUnit /> },
  // gg
  // gg
  { path: '/refdata/firmtype', component: <ListFirmType /> },
  { path: '/refdata/firmtype/add', component: <AddFirmType /> },
  { path: '/refdata/firmtype/:id', component: <EditFirmType /> },
  // gg
  // gg
  { path: '/refdata/clienttype', component: <ListClientType /> },
  {
    path: '/refdata/clienttype/add',
    component: <AddClientType />,
    exact: true,
  },
  {
    path: '/refdata/clienttype/:id',
    component: <EditClientType />,
    exact: true,
  },
  // gg
  // gg
  {
    path: '/refdata/contracttype',
    component: <ListContractType />,
    exact: true,
  },
  {
    path: '/refdata/contracttype/add',
    component: <AddContractType />,
    exact: true,
  },
  {
    path: '/refdata/contracttype/:id',
    component: <EditContractType />,
    exact: true,
  },
  // gg
  // gg
  {
    path: '/refdata/groupexpense',
    component: <ListGroupExpense />,
    exact: true,
  },
  {
    path: '/refdata/groupexpense/add',
    component: <AddGroupExpense />,
    exact: true,
  },
  {
    path: '/refdata/groupexpense/:id',
    component: <EditGroupExpense />,
    exact: true,
  },
  // gg
  // gg
  {
    path: '/refdata/groupproduct',
    component: <ListGroupProduct />,
    exact: true,
  },
  {
    path: '/refdata/groupproduct/add',
    component: <AddGroupProduct />,
    exact: true,
  },
  {
    path: '/refdata/groupproduct/:id',
    component: <EditGroupProduct />,
    exact: true,
  },
  // gg
  // gg
  { path: '/refdata/groupwork', component: <ListGroupWork /> },
  { path: '/refdata/groupwork/add', component: <AddGroupWork /> },
  { path: '/refdata/groupwork/:id', component: <EditGroupWork /> },
  // gg
  // gg
  {
    path: '/refdata/paymentsource',
    component: <ListPaymentSource />,
    exact: true,
  },
  {
    path: '/refdata/paymentsource/add',
    component: <AddPaymentSource />,
    exact: true,
  },
  {
    path: '/refdata/paymentsource/:id',
    component: <EditPaymentSource />,
    exact: true,
  },
  // gg
  // gg
  { path: '/refdata/producttype', component: <ListProductType /> },
  {
    path: '/refdata/producttype/add',
    component: <AddProductType />,
    exact: true,
  },
  {
    path: '/refdata/producttype/:id',
    component: <EditProductType />,
    exact: true,
  },
  // gg
  // gg
  {
    path: '/refdata/taxationtype',
    component: <ListTaxationType />,
    exact: true,
  },
  {
    path: '/refdata/taxationtype/add',
    component: <AddTaxationType />,
    exact: true,
  },
  {
    path: '/refdata/taxationtype/:id',
    component: <EditTaxationType />,
    exact: true,
  },
  // gg
  // gg
  { path: '/refdata/workerrole', component: <ListWorkerRole /> },
  {
    path: '/refdata/workerrole/add',
    component: <AddWorkerRole />,
    exact: true,
  },
  {
    path: '/refdata/workerrole/:id',
    component: <EditWorkerRole />,
    exact: true,
  },
  // gg
  // gg
  { path: '/refdata/clients', component: <ListClient /> },
  {
    path: '/refdata/clients/add',
    component: <AddClient />,
    exact: true,
  },
  {
    path: '/refdata/clients/:id',
    component: <EditClient />,
    exact: true,
  },
  // gg
  // gg
  { path: '/refdata/contract', component: <ListContract /> },
  {
    path: '/refdata/contract/add',
    component: <AddContract />,
    exact: true,
  },
  {
    path: '/refdata/contract/:id',
    component: <EditContract />,
    exact: true,
  },
  // gg
  // gg
  { path: '/refdata/worker', component: <ListWorker /> },
  {
    path: '/refdata/worker/add',
    component: <AddWorker />,
    exact: true,
  },
  {
    path: '/refdata/worker/:id',
    component: <EditWorker />,
    exact: true,
  },
  // gg
  // gg
  { path: '/refdata/products', component: <ListProduct /> },
  {
    path: '/refdata/products/add',
    component: <AddProduct />,
    exact: true,
  },
  {
    path: '/refdata/products/:id',
    component: <EditProduct />,
    exact: true,
  },
  // gg
  // gg
  { path: '/refdata/servicework', component: <ListServiceWork /> },
  {
    path: '/refdata/servicework/add',
    component: <AddServiceWork />,
    exact: true,
  },
  {
    path: '/refdata/servicework/:id',
    component: <EditServiceWork />,
    exact: true,
  },
  // gg
  // gg
  { path: '/refdata/storehouse', component: <ListStoreHouse /> },
  {
    path: '/refdata/storehouse/add',
    component: <AddStoreHouse />,
    exact: true,
  },
  {
    path: '/refdata/storehouse/:id',
    component: <EditStoreHouse />,
    exact: true,
  },
  // gg
  // gg
  {
    path: '/refdata/group-thirdparty-service',
    component: <ListGrThPartyServ />,
  },
  {
    path: '/refdata/group-thirdparty-service/add',
    component: <AddGrThPartyServ />,
    exact: true,
  },
  {
    path: '/refdata/group-thirdparty-service/:id',
    component: <EditGrThPartyServ />,
    exact: true,
  },
  // gg
  // gg
  { path: '/refdata/thirdparty-service', component: <ListThirdPartyServ /> },
  {
    path: '/refdata/thirdparty-service/add',
    component: <AddThirdPartyServ />,
    exact: true,
  },
  {
    path: '/refdata/thirdparty-service/:id',
    component: <EditThirdPartyServ />,
    exact: true,
  },
  // gg
  // gg
  { path: '/accounting/documentnakladnaya', component: <ListDocNakl /> },
  {
    path: '/accounting/documentnakladnaya/add',
    component: <AddDocNakl />,
    exact: true,
  },
  {
    path: '/accounting/documentnakladnaya/:id',
    component: <EditDocNakl />,
    exact: true,
  },
  // gg
];
