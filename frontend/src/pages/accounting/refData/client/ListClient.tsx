import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import MyIconButtonAdd from '../../../../components/account/MyIconButtonAdd';

import TableSimple from '../../../../components/account/TableSimple';

import {
  client__get_all,
  client__delete_one,
} from '../../../../features/accounting/refData/client/client__Slice';
import { I_Client } from '../../../../interfaces/AccountingInterfaces';

const editLink = `/refdata/clients`;

interface NewObject {
  _id: string;
  nameClientLong: string;
  firmType: string;
  taxationType: string;
  clientType: string;
}

function ListClient() {
  const { items, total, isLoading } = useAppSelector(
    (state: RootState) => state.client__state
  );
  const itemsToDisplay = items?.map((item: I_Client) => {
    const allClientTypes = item.clientType?.map((item) => {
      return typeof item !== 'string' ? item.clientTypeName! : item;
    });

    const newObject: NewObject = {
      _id: item._id!,
      nameClientLong: item.nameClientLong!,
      firmType:
        typeof item.firmType !== 'string'
          ? item.firmType?.nameTypeLong!
          : item.firmType!,
      taxationType:
        typeof item.taxationType !== 'string'
          ? item.taxationType?.taxationTypeName!
          : item.taxationType!,

      clientType: allClientTypes?.join(', ')!,
    };

    return newObject;
  });

  const headerFields = [
    'nameClientLong',
    'firmType',
    'taxationType',
    'clientType',
  ];
  const tableFields = [
    'nameClientLong',
    'firmType',
    'taxationType',
    'clientType',
  ];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        items={itemsToDisplay}
        total={total}
        isLoading={isLoading}
        get__all={client__get_all}
        delete__one={client__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListClient;
