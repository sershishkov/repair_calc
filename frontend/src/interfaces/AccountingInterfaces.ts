import dayjs from 'dayjs';
import { I_ClientRequest } from './CommonInterfaces';
import { I_AuthRequest } from './UserInterfaces';

export interface I_Unit extends I_ClientRequest {
  _id?: string;
  unitName?: string;
}

export interface I_FirmType extends I_ClientRequest {
  _id?: string;
  nameTypeLong?: string;
  nameTypeShort?: string;
}

export interface I_TaxationType extends I_ClientRequest {
  _id?: string;
  taxationTypeName?: string;
}

export interface I_GroupWork extends I_ClientRequest {
  _id?: string;
  groupWorkName?: string;
}

export interface I_GroupProduct extends I_ClientRequest {
  _id?: string;
  groupProductName?: string;
}

export interface I_WorkerRole extends I_ClientRequest {
  _id?: string;
  workerRoleName?: string;
}

export interface I_ContractType extends I_ClientRequest {
  _id?: string;
  contractTypeName?: string;
  // ['Общий',
  // 'Сумма',
  // 'Сумма Кошторис',
  // 'Предоплата',
  // 'Частичная предоплата',Бюджет, РемсервисКап, РемсервисПоточн, Покупка, Входящая услуга]
}

export interface I_PaymentSource extends I_ClientRequest {
  _id?: string;
  paymentSourceName?: string;
  // ['Собственные',
  // 'Бюджет',
  // 'Софинанс',
  // 'Форма2',]
}

export interface I_GroupExpense extends I_ClientRequest {
  _id?: string;
  groupExpenseName?: string;
}

export interface I_ClientType extends I_ClientRequest {
  _id?: string;
  clientTypeName?: string;
  //[поставщик, покупатель, наша фирма, налоговая..., услуги]
}

export interface I_ProductType extends I_ClientRequest {
  _id?: string;
  productTypeName?: string;
}

export interface I_Client extends I_ClientRequest {
  _id?: string;
  nameClientLong?: string;
  nameClientShort?: string;
  firmType?: string | I_FirmType;

  postIndex?: string;
  address?: string;
  edrpou?: string;
  inn?: string;
  iban?: string;
  iban_budget?: string;

  passport?: string;
  firstName_imen?: string;
  patronymic_imen?: string;
  lastName_imen?: string;
  firstName_rodit?: string;
  patronymic_rodit?: string;
  lastName_rodit?: string;

  certificateNumber?: string;
  representedBy?: string;
  whichActsOnTheBasis?: string;

  jobTitle?: string;
  jobTitle_rodit?: string;
  tax?: number;
  taxationType?: string | I_TaxationType;

  certificate_PDV?: string;
  telNumber?: string;
  email?: string;
  clientType?: (string | I_ClientType)[];
}

export interface I_Contract extends I_ClientRequest {
  _id?: string;
  contractNumber?: string;
  ourFirm?: string | I_Client;
  client?: string | I_Client;
  contractDate?: dayjs.Dayjs | null;
  contractDescription?: string;
  workAddress?: string;
  contractType?: string | I_ContractType;
  paymentSource?: string | I_PaymentSource;
}

export interface I_Worker extends I_ClientRequest {
  _id?: string;
  firstName?: string;
  patronymic?: string;
  lastName?: string;

  workerRole?: string | I_WorkerRole;
  passportSeries?: string;
  passportNumber?: string;
  representedBy?: string;
  whenIssued?: dayjs.Dayjs | null;

  inn?: string;
  birthDay?: dayjs.Dayjs | null;

  telNumber?: string;
  email?: string;

  equipmentAndTools?: [
    {
      product: string | I_Product;
      amount: number;
      priceBuy_inStore: number;
      rowSum: number;
    }
  ];
}

export interface I_Product extends I_ClientRequest {
  _id?: string;
  productName?: string;

  unit?: string | I_Unit;
  groupProduct?: string[] | I_GroupProduct[];
  productType?: string | I_ProductType;
  priceBuyRecommend?: number;
  normPerOne?: number;
  amountInPackage?: number;
  weight?: number;
  height?: number;
  width?: number;
  length?: number;
  paintingArea?: number;
}

export interface I_ServiceWork extends I_ClientRequest {
  _id?: string;
  serviceWorkName?: string;
  unit?: string | I_Unit;
  groupWork?: string[] | I_GroupWork[];
  priceWorkerRecommend?: number;
  priceClientRecommend?: number;

  products?: string[] | I_Product[];
  equipmentAndTools?: string[] | I_Product[];
}
export interface I_StoreHouse extends I_ClientRequest {
  storeHouseName?: string;
  address?: string;
  products?: [
    {
      product: string | I_Product;
      amount: number;
      priceBuy_inStore: number;
      rowSum: number;
    }
  ];
}

export interface I_GroupThirdPartyService extends I_ClientRequest {
  _id?: string;
  groupThirdPartyServiceName?: string;
}

export interface I_ThirdPartyService extends I_ClientRequest {
  _id?: string;
  thirdPartyServiceName?: string;

  unit?: string | I_Unit;
  groupThirdPartyService?: string[] | I_GroupThirdPartyService[];
  priceBuyRecommend?: number;
}

//////////////////////////////////////////////////////////////

export interface I_Expense extends I_ClientRequest {
  _id?: string;
  expenseDescription?: string;
  groupExpense?: string | I_GroupExpense;
  expenseSum?: number;
  expenseDate?: dayjs.Dayjs | null;
  responsiblePerson?: string | I_Worker;
  contract?: string | I_Contract;
}

export interface I_BankIncome extends I_ClientRequest {
  _id?: string;
  contract?: string | I_Contract;
  paymentSum?: number;
  paymentDate?: dayjs.Dayjs | null;
}

export interface I_SalaryPayment extends I_ClientRequest {
  _id?: string;
  worker?: string | I_Worker;
  paymentSum?: number;
  paymentDate?: dayjs.Dayjs | null;
  contract?: string | I_Contract;
}

export interface I_PaymentToSupplier extends I_ClientRequest {
  _id?: string;
  contract?: string | I_Contract;
  paymentSum?: number;
  paymentDate?: dayjs.Dayjs | null;
}

////////////////////////////
////////////////////////////
export interface I_Nakl_Row {
  row_id?: string;
  _id?: string;
  product: string;
  unit: string | I_Unit;
  amount: string;
  priceSell: string;
  rowSumSell: string;
}

export interface I_DocumentNakladnaya extends I_ClientRequest {
  _id?: string;
  nakladnayaNumber?: string;
  nakladnayaDate?: dayjs.Dayjs | null;
  contract?: string | I_Contract;
  naklRows?: I_Nakl_Row[];
  naklSumSell?: string;
  totalNaklSum?: string;
  storeHouse?: string | I_StoreHouse;
  active?: Boolean;
  // creator?: string | I_AuthRequest;
  typeNakl?: string;

  deleted?: Boolean;
  whoDeleted?: string | I_AuthRequest;
}

export interface I_DocumentAktOfWork extends I_ClientRequest {
  _id?: string;
  aktOfWorkNumber?: string;
  aktOfWorkDate?: dayjs.Dayjs | null;
  contract?: string | I_Contract;
  thirdPartyServices?: [
    {
      thirdPartyService: string | I_ThirdPartyService;
      amount: number;
      priceServiceEntered: number;
      priceServiceSell?: number;
      rowSumServiceEntered?: number;
      rowSumServiceSell?: number;
      enteredContract?: string | I_Contract;
    }
  ];
  serviceWorks?: [
    {
      serviceWork: string | I_ServiceWork;
      amount: number;
      priceWorkWoker: number;
      priceWorkSell?: number;
      rowSumWorkWoker?: number;
      rowSumWorkSell?: number;
      worker: string | I_Worker;
    }
  ];

  active?: Boolean;
  // creator?: string | I_AuthRequest;
  typeNakl?: string;

  deleted?: Boolean;
  whoDeleted?: string | I_AuthRequest;
}
////////////////////////////
////////////////////////////

// export interface I_Deal extends I_ClientRequest {
//   _id?: string;
//   ourFirmName?: string;
//   clientName?: string;
//   contractNumber?: string;
//   groupExpenseName?: string;
//   totalSum?: number;
//   tax?: number;
//   additionalExpense?: number;
//   productSum?: number;
//   workSum?: number;
//   responsiblePerson?: string;
//   workerLastName?: string;
//   income?: number;
// }
