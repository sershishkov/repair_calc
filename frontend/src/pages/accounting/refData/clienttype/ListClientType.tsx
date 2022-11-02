import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import MyIconButtonAdd from '../../../../components/account/MyIconButtonAdd';

import TableSimple from '../../../../components/account/TableSimple';

import {
  clienttype__get_all,
  clienttype__delete_one,
} from '../../../../features/accounting/refData/clienttype/clienttype__Slice';

const editLink = `/refdata/clienttype`;

function ListClientType() {
  const { items, total, isLoading } = useAppSelector(
    (state: RootState) => state.clienttype__state
  );
  const headerFields = ['Name'];
  const tableFields = ['clientTypeName'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        items={items}
        total={total}
        isLoading={isLoading}
        get__all={clienttype__get_all}
        delete__one={clienttype__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListClientType;
