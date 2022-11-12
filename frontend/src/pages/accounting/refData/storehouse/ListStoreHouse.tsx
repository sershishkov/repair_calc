import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import MyIconButtonAdd from '../../../../components/account/MyIconButtonAdd';

import TableSimple from '../../../../components/account/TableSimple';

import {
  storehouse__get_all,
  storehouse__delete_one,
} from '../../../../features/accounting/refData/storehouse/storehouse__Slice';

const editLink = `/refdata/storehouse`;

function ListStoreHouse() {
  const { items, total, isLoading } = useAppSelector(
    (state: RootState) => state.storehouse__state
  );
  const headerFields = ['storeHouseName', 'address'];
  const tableFields = ['storeHouseName', 'address'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        items={items}
        total={total}
        isLoading={isLoading}
        get__all={storehouse__get_all}
        delete__one={storehouse__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListStoreHouse;
