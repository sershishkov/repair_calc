import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';
import dayjs from 'dayjs';

import MyIconButtonAdd from '../../../../components/account/MyIconButtonAdd';

import TableSimple from '../../../../components/account/TableSimple';

import {
  salarypayment__get_all,
  salarypayment__delete_one,
} from '../../../../features/accounting/accountant/salarypayment/salarypayment__Slice';
import { I_SalaryPayment } from '../../../../interfaces/AccountingInterfaces';

const editLink = `/accounting/salarypayment`;

interface NewObject {
  _id: string;
  worker: string;
  paymentSum: string;
  paymentDate: string;
  clientName: string;
}

function ListSalaryPay() {
  const { items, total, isLoading } = useAppSelector(
    (state: RootState) => state.salarypayment__state
  );
  const itemsToDisplay = items?.map((item: I_SalaryPayment) => {
    const newObject: NewObject = {
      _id: item._id!,
      worker:
        typeof item.worker !== 'string'
          ? `${item.worker?.lastName!} ${item.worker?.firstName!}`
          : item.worker!,
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

  const headerFields = ['worker', 'paymentSum', 'paymentDate', 'clientName'];
  const tableFields = ['worker', 'paymentSum', 'paymentDate', 'clientName'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        items={itemsToDisplay}
        total={total}
        isLoading={isLoading}
        get__all={salarypayment__get_all}
        delete__one={salarypayment__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListSalaryPay;
