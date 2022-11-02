import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import MyIconButtonAdd from '../../../../components/account/MyIconButtonAdd';

import TableSimple from '../../../../components/account/TableSimple';

import {
  groupexpense__get_all,
  groupexpense__delete_one,
} from '../../../../features/accounting/refData/groupexpense/groupexpense__Slice';

const editLink = `/refdata/groupexpense`;

function ListGroupExpense() {
  const { items, total, isLoading } = useAppSelector(
    (state: RootState) => state.groupexpense__state
  );
  const headerFields = ['Name'];
  const tableFields = ['groupExpenseName'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        items={items}
        total={total}
        isLoading={isLoading}
        get__all={groupexpense__get_all}
        delete__one={groupexpense__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListGroupExpense;
