import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import MyIconButtonAdd from '../../../../components/account/MyIconButtonAdd';

import TableSimple from '../../../../components/account/TableSimple';

import {
  workerrole__get_all,
  workerrole__delete_one,
} from '../../../../features/accounting/refData/workerrole/workerrole__Slice';

const editLink = `/refdata/workerrole`;

function ListWorkerRole() {
  const current__state = useAppSelector(
    (state: RootState) => state.workerrole__state
  );
  const headerFields = ['Name'];
  const tableFields = ['workerRoleName'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        get__all={workerrole__get_all}
        delete__one={workerrole__delete_one}
        current__state={current__state}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListWorkerRole;
