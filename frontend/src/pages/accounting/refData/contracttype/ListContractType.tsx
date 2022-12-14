import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import MyIconButtonAdd from '../../../../components/account/MyIconButtonAdd';

import TableSimple from '../../../../components/account/TableSimple';

import {
  contracttype__get_all,
  contracttype__delete_one,
} from '../../../../features/accounting/refData/contracttype/contracttype__Slice';

const editLink = `/refdata/contracttype`;

function ListContractType() {
  const { items, total, isLoading } = useAppSelector(
    (state: RootState) => state.contracttype__state
  );
  const headerFields = ['Name'];
  const tableFields = ['contractTypeName'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        items={items}
        total={total}
        isLoading={isLoading}
        get__all={contracttype__get_all}
        delete__one={contracttype__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListContractType;
