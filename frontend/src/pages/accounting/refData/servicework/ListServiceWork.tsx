import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import MyIconButtonAdd from '../../../../components/account/MyIconButtonAdd';

import TableSimple from '../../../../components/account/TableSimple';

import {
  client__get_all,
  client__delete_one,
} from '../../../../features/accounting/refData/client/client__Slice';
import { I_ServiceWork } from '../../../../interfaces/AccountingInterfaces';

const editLink = `/refdata/servicework`;

interface NewObject {
  _id: string;
  serviceWorkName: string;
  unit: string;
  groupWork: string;
  priceWorker: string;
}

function ListServiceWork() {
  const { items, total, isLoading } = useAppSelector(
    (state: RootState) => state.client__state
  );
  const itemsToDisplay = items?.map((item: I_ServiceWork) => {
    const allGroupeWorks = item.groupWork?.map((item) => {
      return typeof item !== 'string' ? item.groupWorkName! : item;
    });

    const newObject: NewObject = {
      _id: item._id!,
      serviceWorkName: item.serviceWorkName!,
      unit: typeof item.unit !== 'string' ? item.unit?.unitName! : item.unit!,
      groupWork: allGroupeWorks?.join(', ')!,
      priceWorker: item.priceWorker!.toString(),
    };

    return newObject;
  });

  const headerFields = ['serviceWorkName', 'unit', 'groupWork', 'priceWorker'];
  const tableFields = ['serviceWorkName', 'unit', 'groupWork', 'priceWorker'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        items={itemsToDisplay}
        total={total}
        isLoading={isLoading}
        get__all={client__get_all}
        delete__one={client__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListServiceWork;
