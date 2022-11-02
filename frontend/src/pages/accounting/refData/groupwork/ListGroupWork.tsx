import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import MyIconButtonAdd from '../../../../components/account/MyIconButtonAdd';

import TableSimple from '../../../../components/account/TableSimple';

import {
  groupwork__get_all,
  groupwork__delete_one,
} from '../../../../features/accounting/refData/groupwork/groupwork__Slice';

const editLink = `/refdata/groupwork`;

function ListGroupWork() {
  const { items, total, isLoading } = useAppSelector(
    (state: RootState) => state.groupwork__state
  );
  const headerFields = ['Name'];
  const tableFields = ['groupWorkName'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        items={items}
        total={total}
        isLoading={isLoading}
        get__all={groupwork__get_all}
        delete__one={groupwork__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListGroupWork;
