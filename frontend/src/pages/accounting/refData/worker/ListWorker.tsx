import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';
import dayjs from 'dayjs';

import MyIconButtonAdd from '../../../../components/account/MyIconButtonAdd';

import TableSimple from '../../../../components/account/TableSimple';

import {
  worker__get_all,
  worker__delete_one,
} from '../../../../features/accounting/refData/worker/worker__Slice';
import { I_Worker } from '../../../../interfaces/AccountingInterfaces';

const editLink = `/refdata/worker`;

interface NewObject {
  _id: string;
  lastName: string;
  firstName: string;
  workerRole: string;
  birthDay: string;
}

function ListWorker() {
  const { items, total, isLoading } = useAppSelector(
    (state: RootState) => state.client__state
  );
  const itemsToDisplay = items?.map((item: I_Worker) => {
    const newObject: NewObject = {
      _id: item._id!,
      lastName: item.lastName!,
      firstName: item.firstName!,
      workerRole:
        typeof item.workerRole !== 'string'
          ? item.workerRole?.workerRoleName!
          : item.workerRole!,
      birthDay: dayjs(item.birthDay!).format('DD-MM-YYYY'),
    };

    return newObject;
  });

  const headerFields = ['lastName', 'firstName', 'workerRole', 'birthDay'];
  const tableFields = ['lastName', 'firstName', 'workerRole', 'birthDay'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        items={itemsToDisplay}
        total={total}
        isLoading={isLoading}
        get__all={worker__get_all}
        delete__one={worker__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListWorker;
