import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';
import dayjs from 'dayjs';

import MyIconButtonAdd from '../../../../components/account/MyIconButtonAdd';

import TableSimple from '../../../../components/account/TableSimple';

import {
  bankincome__get_all,
  bankincome__delete_one,
} from '../../../../features/accounting/accountant/bankincome/bankincome__Slice';
import { I_BankIncome } from '../../../../interfaces/AccountingInterfaces';

const editLink = `/accounting/bankincome`;

interface NewObject {
  _id: string;
  paymentSum: string;
  paymentDate: string;
  clientName: string;
}

function ListBankIncome() {
  const { items, total, isLoading } = useAppSelector(
    (state: RootState) => state.bankincome__state
  );
  const itemsToDisplay = items?.map((item: I_BankIncome) => {
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
        get__all={bankincome__get_all}
        delete__one={bankincome__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListBankIncome;
