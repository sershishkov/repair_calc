import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';
import dayjs from 'dayjs';

import MyIconButtonAdd from '../../../../components/account/MyIconButtonAdd';

import TableSimple from '../../../../components/account/TableSimple';

import {
  paymenttosupplier__get_all,
  paymenttosupplier__delete_one,
} from '../../../../features/accounting/accountant/paymenttosupplier/paymenttosupplier__Slice';
import { I_PaymentToSupplier } from '../../../../interfaces/AccountingInterfaces';

const editLink = `/accounting/paymenttosupplier`;

interface NewObject {
  _id: string;
  paymentSum: string;
  paymentDate: string;
  clientName: string;
}

function ListPayToSuppl() {
  const { items, total, isLoading } = useAppSelector(
    (state: RootState) => state.paymenttosupplier__state
  );
  const itemsToDisplay = items?.map((item: I_PaymentToSupplier) => {
    const newObject: NewObject = {
      _id: item._id!,
      paymentSum: item.paymentSum!.toString(),

      paymentDate: dayjs(item.paymentDate!).format('DD-MM-YYYY'),

      clientName:
        typeof item.contract !== 'string'
          ? typeof item.contract?.client !== 'string'
            ? item.contract?.client?.nameClientShort!
            : item.contract?.client
          : item.contract!,
    };

    return newObject;
  });

  const headerFields = ['paymentSum', 'paymentDate', 'clientName'];
  const tableFields = ['paymentSum', 'paymentDate', 'clientName'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        items={itemsToDisplay}
        total={total}
        isLoading={isLoading}
        get__all={paymenttosupplier__get_all}
        delete__one={paymenttosupplier__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListPayToSuppl;
