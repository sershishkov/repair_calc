import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import MyIconButtonAdd from '../../../../components/account/MyIconButtonAdd';

import TableSimple from '../../../../components/account/TableSimple';

import {
  taxationtype__get_all,
  taxationtype__delete_one,
} from '../../../../features/accounting/refData/taxationtype/taxationtype__Slice';

const editLink = `/refdata/taxationtype`;

function ListTaxationType() {
  const { items, total, isLoading } = useAppSelector(
    (state: RootState) => state.taxationtype__state
  );
  const headerFields = ['Name'];
  const tableFields = ['taxationTypeName'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        items={items}
        total={total}
        isLoading={isLoading}
        get__all={taxationtype__get_all}
        delete__one={taxationtype__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListTaxationType;
