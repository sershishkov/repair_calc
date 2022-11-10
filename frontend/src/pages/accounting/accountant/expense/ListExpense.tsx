import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';
import dayjs from 'dayjs';

import MyIconButtonAdd from '../../../../components/account/MyIconButtonAdd';

import TableSimple from '../../../../components/account/TableSimple';

import {
  expense__get_all,
  expense__delete_one,
} from '../../../../features/accounting/accountant/expense/expense__Slice';
import { I_Expense } from '../../../../interfaces/AccountingInterfaces';

const editLink = `/accounting/expense`;

interface NewObject {
  _id: string;
  expenseDescription: string;
  expenseSum: string;
  expenseDate: string;
  groupExpense: string;
  contractDescription: string;
  clientName: string;
}

function ListExpense() {
  const { items, total, isLoading } = useAppSelector(
    (state: RootState) => state.expense__state
  );
  const itemsToDisplay = items?.map((item: I_Expense) => {
    const newObject: NewObject = {
      _id: item._id!,
      expenseDescription: item.expenseDescription!,
      expenseSum: item.expenseSum!.toString(),
      expenseDate: dayjs(item.expenseDate!).format('DD-MM-YYYY'),
      groupExpense:
        typeof item.groupExpense !== 'string'
          ? item.groupExpense?.groupExpenseName!
          : item.groupExpense!,

      contractDescription:
        typeof item.contract !== 'string'
          ? item.contract?.contractDescription!
          : item.contract!,
      clientName:
        typeof item.contract !== 'string'
          ? typeof item.contract?.client !== 'string'
            ? item.contract?.client?.nameClientShort!
            : item.contract?.client
          : item.contract!,
    };

    return newObject;
  });

  const headerFields = [
    'expenseDescription',
    'expenseSum',
    'expenseDate',
    'groupExpense',
    'contractDescription',
    'clientName',
  ];
  const tableFields = [
    'expenseDescription',
    'expenseSum',
    'expenseDate',
    'groupExpense',
    'contractDescription',
    'clientName',
  ];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        items={itemsToDisplay}
        total={total}
        isLoading={isLoading}
        get__all={expense__get_all}
        delete__one={expense__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListExpense;
