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
  const current__state = useAppSelector(
    (state: RootState) => state.firmtype__state
  );
  const headerFields = ['NameLong', 'NameShort'];
  const tableFields = ['nameTypeLong', 'nameTypeShort'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        get__all={firmtype__get_all}
        delete__one={firmtype__delete_one}
        current__state={current__state}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListUnit;
