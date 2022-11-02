import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import MyIconButtonAdd from '../../../../components/account/MyIconButtonAdd';

import TableSimple from '../../../../components/account/TableSimple';

import {
  paymentsource__get_all,
  paymentsource__delete_one,
} from '../../../../features/accounting/refData/paymentsource/paymentsource__Slice';

const editLink = `/refdata/paymentsource`;

function ListPaymentSource() {
  const { items, total, isLoading } = useAppSelector(
    (state: RootState) => state.paymentsource__state
  );
  const headerFields = ['Name'];
  const tableFields = ['paymentSourceName'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        items={items}
        total={total}
        isLoading={isLoading}
        get__all={paymentsource__get_all}
        delete__one={paymentsource__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListPaymentSource;
