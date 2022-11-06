import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';
import dayjs from 'dayjs';

import MyIconButtonAdd from '../../../../components/account/MyIconButtonAdd';

import TableSimple from '../../../../components/account/TableSimple';

import {
  contract__get_all,
  contract__delete_one,
} from '../../../../features/accounting/refData/contract/contract__Slice';
import { I_Contract } from '../../../../interfaces/AccountingInterfaces';

const editLink = `/refdata/contract`;

interface NewObject {
  _id: string;
  contractNumber: string;
  ourFirm: string;
  client: string;
  contractDate: string;
  contractDescription: string;
}

function ListContract() {
  const { items, total, isLoading } = useAppSelector(
    (state: RootState) => state.contract__state
  );
  const itemsToDisplay = items?.map((item: I_Contract) => {
    const newObject: NewObject = {
      _id: item._id!,
      contractNumber: item.contractNumber!,

      ourFirm:
        typeof item.ourFirm !== 'string'
          ? item.ourFirm?.nameClientShort!
          : item.ourFirm!,

      client:
        typeof item.client !== 'string'
          ? item.client?.nameClientShort!
          : item.client!,

      contractDate: dayjs(item.contractDate!).format('DD-MM-YYYY'),
      contractDescription: item.contractDescription!,
    };

    return newObject;
  });

  const headerFields = [
    'contractNumber',
    'ourFirm',
    'client',
    'contractDate',
    'contractDescription',
  ];
  const tableFields = [
    'contractNumber',
    'ourFirm',
    'client',
    'contractDate',
    'contractDescription',
  ];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        items={itemsToDisplay}
        total={total}
        isLoading={isLoading}
        get__all={contract__get_all}
        delete__one={contract__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListContract;
