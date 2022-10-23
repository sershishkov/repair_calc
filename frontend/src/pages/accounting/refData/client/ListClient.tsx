import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import MyIconButtonAdd from '../../../../components/account/MyIconButtonAdd';

import TableSimple from '../../../../components/account/TableSimple';

import {
  client__get_all,
  client__delete_one,
} from '../../../../features/accounting/refData/client/client__Slice';

const editLink = `/refdata/clients`;

function ListClient() {
  const current__state = useAppSelector(
    (state: RootState) => state.client__state
  );
  const headerFields = ['nameClientLong'];
  const tableFields = ['nameClientLong'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        get__all={client__get_all}
        delete__one={client__delete_one}
        current__state={current__state}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListClient;
