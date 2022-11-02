import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import MyIconButtonAdd from '../../../../components/account/MyIconButtonAdd';

import TableSimple from '../../../../components/account/TableSimple';

import {
  firmtype__get_all,
  firmtype__delete_one,
} from '../../../../features/accounting/refData/firmtype/firmtype__Slice';

const editLink = `/refdata/firmtype`;

function ListUnit() {
  const { items, total, isLoading } = useAppSelector(
    (state: RootState) => state.firmtype__state
  );
  const headerFields = ['NameLong', 'NameShort'];
  const tableFields = ['nameTypeLong', 'nameTypeShort'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        items={items}
        total={total}
        isLoading={isLoading}
        get__all={firmtype__get_all}
        delete__one={firmtype__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListUnit;
