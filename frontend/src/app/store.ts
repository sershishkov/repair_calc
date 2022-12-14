import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import themeSlice from '../features/theme/themeSlice';

import user__Slice from '../features/users/user__Slice';
import unit__Slice from '../features/accounting/refData/unit/unit__Slice';
import firmtype__Slice from '../features/accounting/refData/firmtype/firmtype__Slice';
import taxationtype__Slice from '../features/accounting/refData/taxationtype/taxationtype__Slice';
import groupwork__Slice from '../features/accounting/refData/groupwork/groupwork__Slice';
import groupproduct__Slice from '../features/accounting/refData/groupproduct/groupproduct__Slice';
import workerrole__Slice from '../features/accounting/refData/workerrole/workerrole__Slice';
import contracttype__Slice from '../features/accounting/refData/contracttype/contracttype__Slice';
import paymentsource__Slice from '../features/accounting/refData/paymentsource/paymentsource__Slice';
import groupexpense__Slice from '../features/accounting/refData/groupexpense/groupexpense__Slice';
import clienttype__Slice from '../features/accounting/refData/clienttype/clienttype__Slice';
import producttype__Slice from '../features/accounting/refData/producttype/producttype__Slice';
import client__Slice from '../features/accounting/refData/client/client__Slice';
import contract__Slice from '../features/accounting/refData/contract/contract__Slice';
import worker__Slice from '../features/accounting/refData/worker/worker__Slice';
import product__Slice from '../features/accounting/refData/product/product__Slice';
import servicework__Slice from '../features/accounting/refData/servicework/servicework__Slice';
import storehouse__Slice from '../features/accounting/refData/storehouse/storehouse__Slice';
import grThirdpartyService__Slice from '../features/accounting/refData/group-thirdparty-service/grThirdpartyService__Slice';
import thirdpartyService__Slice from '../features/accounting/refData/thirdparty-service/thirdpartyService__Slice';

import bankincome__Slice from '../features/accounting/accountant/bankincome/bankincome__Slice';
import expense__Slice from '../features/accounting/accountant/expense/expense__Slice';
import paymenttosupplier__Slice from '../features/accounting/accountant/paymenttosupplier/paymenttosupplier__Slice';
import salarypayment__Slice from '../features/accounting/accountant/salarypayment/salarypayment__Slice';
import documentaktofwork__Slice from '../features/accounting/accountant/documentaktofwork/documentaktofwork__Slice';
import documentnakladnaya__Slice from '../features/accounting/accountant/documentnakladnaya/documentnakladnaya__Slice';

export const store = configureStore({
  reducer: {
    auth_state: authSlice,
    theme_state: themeSlice,
    user__state: user__Slice,

    unit__state: unit__Slice,
    firmtype__state: firmtype__Slice,
    taxationtype__state: taxationtype__Slice,
    groupwork__state: groupwork__Slice,
    groupproduct__state: groupproduct__Slice,
    workerrole__state: workerrole__Slice,
    contracttype__state: contracttype__Slice,
    paymentsource__state: paymentsource__Slice,
    groupexpense__state: groupexpense__Slice,
    clienttype__state: clienttype__Slice,
    producttype__state: producttype__Slice,
    storehouse__state: storehouse__Slice,
    grThirdpartyService__state: grThirdpartyService__Slice,
    thirdpartyService__state: thirdpartyService__Slice,

    client__state: client__Slice,
    contract__state: contract__Slice,
    worker__state: worker__Slice,
    product__state: product__Slice,
    servicework__state: servicework__Slice,
    bankincome__state: bankincome__Slice,
    expense__state: expense__Slice,
    paymenttosupplier__state: paymenttosupplier__Slice,
    salarypayment__state: salarypayment__Slice,
    documentaktofwork__state: documentaktofwork__Slice,
    documentnakladnaya__state: documentnakladnaya__Slice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
