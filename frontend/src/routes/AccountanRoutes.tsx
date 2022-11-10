import React from 'react';

const AddBankIncome = React.lazy(
  () => import('../pages/accounting/accountant/bankincome/AddBankIncome')
);
const EditBankIncome = React.lazy(
  () => import('../pages/accounting/accountant/bankincome/EditBankIncome')
);
const ListBankIncome = React.lazy(
  () => import('../pages/accounting/accountant/bankincome/ListBankIncome')
);

const AddExpense = React.lazy(
  () => import('../pages/accounting/accountant/expense/AddExpense')
);
const EditExpense = React.lazy(
  () => import('../pages/accounting/accountant/expense/EditExpense')
);
const ListExpense = React.lazy(
  () => import('../pages/accounting/accountant/expense/ListExpense')
);

const AddPayToSuppl = React.lazy(
  () => import('../pages/accounting/accountant/paymenttosupplier/AddPayToSuppl')
);
const EditPayToSuppl = React.lazy(
  () =>
    import('../pages/accounting/accountant/paymenttosupplier/EditPayToSuppl')
);
const ListPayToSuppl = React.lazy(
  () =>
    import('../pages/accounting/accountant/paymenttosupplier/ListPayToSuppl')
);

const AddSalaryPay = React.lazy(
  () => import('../pages/accounting/accountant/salarypayment/AddSalaryPay')
);
const EditSalaryPay = React.lazy(
  () => import('../pages/accounting/accountant/salarypayment/EditSalaryPay')
);
const ListSalaryPay = React.lazy(
  () => import('../pages/accounting/accountant/salarypayment/ListSalaryPay')
);

export const AccountanRoutes = [
  // gg
  { path: '/accounting/bankincome/add', component: <AddBankIncome /> },
  { path: '/accounting/bankincome/:id', component: <EditBankIncome /> },
  { path: '/accounting/bankincome', component: <ListBankIncome /> },
  // gg
  // gg
  { path: '/accounting/expense/add', component: <AddExpense /> },
  { path: '/accounting/expense/:id', component: <EditExpense /> },
  { path: '/accounting/expense', component: <ListExpense /> },
  // gg
  // gg
  { path: '/accounting/paymenttosupplier/add', component: <AddPayToSuppl /> },
  { path: '/accounting/paymenttosupplier/:id', component: <EditPayToSuppl /> },
  { path: '/accounting/paymenttosupplier', component: <ListPayToSuppl /> },
  // gg
  // gg
  { path: '/accounting/salarypayment/add', component: <AddSalaryPay /> },
  { path: '/accounting/salarypayment/:id', component: <EditSalaryPay /> },
  { path: '/accounting/salarypayment', component: <ListSalaryPay /> },
  // gg
];
