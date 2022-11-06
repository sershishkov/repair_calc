import dayjs from 'dayjs';
import { I_ClientRequest } from './CommonInterfaces';

export interface I_Unit extends I_ClientRequest {
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
  // 'Частичная предоплата',Бюджет, РемсервисКап, РемсервисПоточн,Покупка]
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
  // ПОставщик, покупатель, наша фирма, налоговая
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
  workerRole?: string;
  passportSeries?: string;
  passportNumber?: string;
  representedBy?: string;
  whenIssued?: dayjs.Dayjs | null;
  birthDay?: dayjs.Dayjs | null;
}

export interface I_Product extends I_ClientRequest {
  _id?: string;
  productName?: string;
  unit?: string | I_Unit;
  groupProductName?: string | I_GroupProduct;
  productTypeName?: string | I_ProductType;
  priceBuy?: number;
  priceSell?: number;
  normPer1?: number;
  amountInPackage?: number;
  weight?: number;
  height?: number;
  width?: number;
  length?: number;
}

export interface I_ServiceWork extends I_ClientRequest {
  _id?: string;
  serviceWorkName?: string;
  unit?: string | I_Unit;
  groupWork?: string[];
  priceWorker?: number;
  priceClient?: number;
  products?: string[] | I_Product[];
  equipmentAndTools?: string[] | I_Product[];
}

//////////////////////////////////////////////////////////////

export interface I_Expense extends I_ClientRequest {
  _id?: string;
  expenseDescription?: string;
  groupExpenseName?: string | I_GroupExpense;
  expenseSum?: number;
  expenseDate?: dayjs.Dayjs | null;
  responsiblePerson?: string | I_Worker;
  contract?: string | I_Contract;
}

export interface I_BankIncome extends I_ClientRequest {
  _id?: string;
  ourFirmName: string | I_Client;
  clientName: string | I_Client;
  contractNumber?: string | I_Contract;
  paymentSum: number;
  paymentDate: dayjs.Dayjs | null;
}

export interface I_SalaryPayment {
  _id?: string;
  worker: string | I_Worker;
  paymentSum: number;
  paymentDate: dayjs.Dayjs | null;
  contractNumber?: string | I_Contract;
}

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
