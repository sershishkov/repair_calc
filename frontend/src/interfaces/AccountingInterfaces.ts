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
  // 'Частичная предоплата',]
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
}

export interface I_ProductType extends I_ClientRequest {
  _id?: string;
  productTypeName?: string;
}

export interface I_Client extends I_ClientRequest {
  _id?: string;
  nameClientLong?: string;
  nameClientShort?: string;
  firmTypeLong?: string;
  firmTypeShort?: string;
  postIndex?: number;
  address?: string;
  edrpou?: number;
  inn?: number;
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
  jobTitle?: string;
  tax?: number;
  taxationType?: string;
  telNumber?: string;
  email?: string;
}

export interface I_Contract extends I_ClientRequest {
  _id?: string;
  ourFirmName?: string;
  clientName?: string;
  contractNumber?: string;
  contractDate?: Date;
  contractTypeName?: string;
  paymentSource?: string;
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
  whenIssued?: Date;
  birthDay?: Date;
}

export interface I_Product extends I_ClientRequest {
  _id?: string;
  productName?: string;
  unit?: string;
  groupProductName?: string;
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
  unit?: string;
  groupWork?: string[];
  priceWorker?: number;
  priceClient?: number;
  products?: string[];
  equipmentAndTools?: string[];
}

//////////////////////////////////////////////////////////////

export interface I_Expense extends I_ClientRequest {
  _id?: string;
  expenseDescription?: string;
  groupExpenseName?: string;
  expenseSum?: number;
  expenseDate?: Date;
  responsiblePerson?: string;
  contract?: string;
}

export interface I_Deal extends I_ClientRequest {
  _id?: string;
  ourFirmName?: string;
  clientName?: string;
  workAddress?: string;
  workDescription?: string;
  contractNumber?: string;
  groupExpenseName?: string;
  totalSum?: number;
  tax?: number;
  additionalExpense?: number;
  productSum?: number;
  workSum?: number;
  responsiblePerson?: string;
  workerLastName?: string;
  income?: number;
}

export interface I_BankIncome extends I_ClientRequest {
  _id?: string;
  ourFirmName: string;
  clientName: string;
  contractNumber?: string;
  paymentSum: number;
  paymentDate: Date;
}

export interface I_SalaryPayment {
  _id?: string;
  workerLastName: string;
  paymentSum: number;
  paymentDate: Date;
  contractNumber?: string;
}

export interface I_OurFirm extends I_Client, I_ClientRequest {
  simpleName: string;
}
