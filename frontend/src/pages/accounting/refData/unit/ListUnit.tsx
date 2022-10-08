import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import MyIconButtonAdd from '../../../../components/account/MyIconButtonAdd';

import TableSimple from '../../../../components/account/TableSimple';

import {
  unit__get_all,
  unit__delete_one,
} from '../../../../features/accounting/refData/unit/unit__Slice';

const editLink = `/refdata/unit`;

function ListUnit() {
  const current__state = useAppSelector(
    (state: RootState) => state.unit__state
  );
  const headerFields = ['Name'];
  const tableFields = ['unitName'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        get__all={unit__get_all}
        delete__one={unit__delete_one}
        current__state={current__state}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListUnit;
