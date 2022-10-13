import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import MyIconButtonAdd from '../../../../components/account/MyIconButtonAdd';

import TableSimple from '../../../../components/account/TableSimple';

import {
  producttype__get_all,
  producttype__delete_one,
} from '../../../../features/accounting/refData/producttype/producttype__Slice';

const editLink = `/refdata/producttype`;

function ListProductType() {
  const current__state = useAppSelector(
    (state: RootState) => state.producttype__state
  );
  const headerFields = ['Name'];
  const tableFields = ['productTypeName'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        get__all={producttype__get_all}
        delete__one={producttype__delete_one}
        current__state={current__state}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListProductType;
