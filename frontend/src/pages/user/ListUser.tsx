import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

import MyIconButtonAdd from '../../components/account/MyIconButtonAdd';

import TableSimple from '../../components/account/TableSimple';

import {
  user__get_all,
  user__delete_one,
} from '../../features/users/user__Slice';

const ListUser = () => {
  const current__state = useAppSelector(
    (state: RootState) => state.user__state
  );
  const headerFields = ['Name', 'email', 'role'];
  const tableFields = ['name', 'email', 'role'];
  return (
    <>
      <MyIconButtonAdd href={`/user-admin/add`} />

      <TableSimple
        get__all={user__get_all}
        delete__one={user__delete_one}
        current__state={current__state}
        headerFields={headerFields}
        tableFields={tableFields}
      />
    </>
  );
};

export default ListUser;
