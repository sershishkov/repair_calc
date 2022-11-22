import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import MyIconButtonAdd from '../../../../components/account/MyIconButtonAdd';

import TableSimple from '../../../../components/account/TableSimple';

import {
  grThirdPartyService__get_all,
  grThirdPartyService__delete_one,
} from '../../../../features/accounting/refData/group-thirdparty-service/grThirdpartyService__Slice';

const editLink = `/refdata/group-thirdparty-service`;

function ListGrThPartyServ() {
  const { items, total, isLoading } = useAppSelector(
    (state: RootState) => state.grThirdpartyService__state
  );
  const headerFields = ['groupThirdPartyServiceName'];
  const tableFields = ['groupThirdPartyServiceName'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        items={items}
        total={total}
        isLoading={isLoading}
        get__all={grThirdPartyService__get_all}
        delete__one={grThirdPartyService__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListGrThPartyServ;
