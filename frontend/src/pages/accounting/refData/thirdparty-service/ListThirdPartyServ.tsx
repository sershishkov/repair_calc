import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import MyIconButtonAdd from '../../../../components/account/MyIconButtonAdd';

import TableSimple from '../../../../components/account/TableSimple';

import {
  thirdPartyService__get_all,
  thirdPartyService__delete_one,
} from '../../../../features/accounting/refData/thirdparty-service/thirdpartyService__Slice';
import { I_ThirdPartyService } from '../../../../interfaces/AccountingInterfaces';

const editLink = `/refdata/thirdparty-service`;

interface NewObject {
  _id: string;
  thirdPartyServiceName: string;
  unit: string;
  groupThirdPartyService: string;
  priceBuyRecommend: string;
}

function ListThirdPartyServ() {
  const { items, total, isLoading } = useAppSelector(
    (state: RootState) => state.thirdpartyService__state
  );
  const itemsToDisplay = items?.map((item: I_ThirdPartyService) => {
    const allGroupeThirdPartyServices = item.groupThirdPartyService?.map(
      (item) => {
        return typeof item !== 'string'
          ? item.groupThirdPartyServiceName!
          : item;
      }
    );

    const newObject: NewObject = {
      _id: item._id!,
      thirdPartyServiceName: item.thirdPartyServiceName!,
      unit: typeof item.unit !== 'string' ? item.unit?.unitName! : item.unit!,
      groupThirdPartyService: allGroupeThirdPartyServices?.join(', ')!,
      priceBuyRecommend: item.priceBuyRecommend!.toString(),
    };

    return newObject;
  });

  const headerFields = [
    'thirdPartyServiceName',
    'unit',
    'groupThirdPartyService',
    'priceBuyRecommend',
  ];
  const tableFields = [
    'thirdPartyServiceName',
    'unit',
    'groupThirdPartyService',
    'priceBuyRecommend',
  ];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        items={itemsToDisplay}
        total={total}
        isLoading={isLoading}
        get__all={thirdPartyService__get_all}
        delete__one={thirdPartyService__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
}

export default ListThirdPartyServ;
