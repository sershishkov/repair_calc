import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import MyIconButtonAdd from '../../../../components/account/MyIconButtonAdd';

import TableSimple from '../../../../components/account/TableSimple';

import {
  product__get_all,
  product__delete_one,
} from '../../../../features/accounting/refData/product/product__Slice';
import { I_Product } from '../../../../interfaces/AccountingInterfaces';

const editLink = `/refdata/products`;

interface NewObject {
  _id: string;
  productName: string;
  unit: string;
  groupProduct: string;
  priceBuy: string;
}

function ListProduct() {
  const { items, total, isLoading } = useAppSelector(
    (state: RootState) => state.client__state
  );
  const itemsToDisplay = items?.map((item: I_Product) => {
    const newObject: NewObject = {
      _id: item._id!,
      productName: item.productName!,
      unit: typeof item.unit !== 'string' ? item.unit?.unitName! : item.unit!,
      groupProduct:
        typeof item.groupProduct !== 'string'
          ? item.groupProduct?.groupProductName!
          : item.groupProduct!,

      priceBuy: item.priceBuy!.toString(),
    };

    return newObject;
  });

  const headerFields = ['productName', 'unit', 'groupProduct', 'priceBuy'];
  const tableFields = ['productName', 'unit', 'groupProduct', 'priceBuy'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        items={itemsToDisplay}
        total={total}
        isLoading={isLoading}
        get__all={product__get_all}
        delete__one={product__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListProduct;
