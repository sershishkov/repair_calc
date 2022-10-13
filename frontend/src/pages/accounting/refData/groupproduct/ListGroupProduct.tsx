import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import MyIconButtonAdd from '../../../../components/account/MyIconButtonAdd';

import TableSimple from '../../../../components/account/TableSimple';

import {
  groupproduct__get_all,
  groupproduct__delete_one,
} from '../../../../features/accounting/refData/groupproduct/groupproduct__Slice';

const editLink = `/refdata/groupproduct`;

function ListGroupProduct() {
  const current__state = useAppSelector(
    (state: RootState) => state.groupproduct__state
  );
  const headerFields = ['Name'];
  const tableFields = ['groupProductName'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        get__all={groupproduct__get_all}
        delete__one={groupproduct__delete_one}
        current__state={current__state}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListGroupProduct;
