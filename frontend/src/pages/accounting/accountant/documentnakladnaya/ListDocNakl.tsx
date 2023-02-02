import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';
import dayjs from 'dayjs';

import MyIconButtonAdd from '../../../../components/account/MyIconButtonAdd';

import TableSimple from '../../../../components/account/TableSimple';

import {
  documentnakladnaya__get_all,
  documentnakladnaya__delete_one,
} from '../../../../features/accounting/accountant/documentnakladnaya/documentnakladnaya__Slice';
import { I_DocumentNakladnaya } from '../../../../interfaces/AccountingInterfaces';

const editLink = `/accounting/documentnakladnaya`;

interface NewObject {
  _id: string;
  nakladnayaNumber: string;
  nakladnayaDate: string;
  clientName: string;
  totalNaklSum: string;
  isActive: string;
  typeNakl: string;
}

function ListDocNakl() {
  const { items, total, isLoading } = useAppSelector(
    (state: RootState) => state.documentnakladnaya__state
  );
  const itemsToDisplay = items?.map((item: I_DocumentNakladnaya) => {
    const newObject: NewObject = {
      _id: item._id!,
      nakladnayaNumber: item.nakladnayaNumber!,
      nakladnayaDate: dayjs(item.nakladnayaDate!).format('DD-MM-YYYY'),
      clientName:
        typeof item.contract !== 'string'
          ? typeof item.contract?.client !== 'string'
            ? item.contract?.client?.nameClientShort!
            : item.contract?.client
          : item.contract!,

      totalNaklSum: item.totalNaklSum!,

      isActive: item.active! ? 'проведено' : 'не проведено',
      typeNakl: item.typeNakl!,
    };

    return newObject;
  });

  const headerFields = [
    'nakladnayaNumber',
    'nakladnayaDate',
    'clientName',

    'totalNaklSum',

    'isActive',
    'typeNakl',
  ];
  const tableFields = [
    'nakladnayaNumber',
    'nakladnayaDate',
    'clientName',

    'totalNaklSum',

    'isActive',
    'typeNakl',
  ];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        items={itemsToDisplay}
        total={total}
        isLoading={isLoading}
        get__all={documentnakladnaya__get_all}
        delete__one={documentnakladnaya__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListDocNakl;
