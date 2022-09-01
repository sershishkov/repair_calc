import { Types } from 'mongoose';

export interface I_Unit {
  _id?: string;
  unitName: string;
}

export interface I_firmType {
  _id?: string;
  nameTypeLong: string;
  nameTypeShort: string | null;
}

export interface I_TaxationType {
  _id?: string;
  taxationTypeName: string;
}

export interface I_GroupWork {
  _id?: string;
  groupWorkName: string;
}

export interface I_GroupProduct {
  _id?: string;
  groupProductName: string;
}

export interface I_WorkerRole {
  _id?: string;
  workerRoleName: string;
}

export interface I_ContractType {
  _id?: string;
  contractTypeName: string;
  // ['Общий',
  // 'Сумма',
  // 'Сумма Кошторис',
  // 'Предоплата',
  // 'Частичная предоплата',]
}
export interface I_PaymentSource {
  _id?: string;
  paymentSourceName: string;
  // ['Собственные',
  // 'Бюджет',
  // 'Софинанс',
  // 'Форма2',]
}

export interface I_GroupExpense {
  _id?: string;
  groupExpenseName: string;
}

export interface I_ClientType {
  _id?: string;
  clientTypeName: string;
  //[поставщик, покупатель, наша фирма, налоговая..., услуги]
}

export interface I_Client {
  _id?: string;
  nameClientLong: string;
  nameClientShort: string;
  firmType?: Types.ObjectId;
  firmTypeLong?: string;
  firmTypeShort?: string;
  postIndex: number;
  address: string;
  edrpou?: number;
  inn?: number;
  iban?: string;
  iban_budget?: string;
  passport?: string;
  firstName_imen: string;
  patronymic_imen: string;
  lastName_imen: string;
  firstName_rodit: string;
  patronymic_rodit: string;
  lastName_rodit: string;
  certificateNumber?: string;
  representedBy?: string;
  whichActsOnTheBasis?: string;
  jobTitle?: string;
  jobTitle_rodit?: string;
  tax?: number;
  taxationType?: Types.ObjectId;
  taxationTypeName?: string;
  certificate_PDV: string;
  telNumber?: string;
  email?: string;
  clientTypesName?: [string];
  clientType?: [Types.ObjectId];
}

export interface I_SalaryPayment {
  _id?: string;
  workerLastName?: string;
  worker: Types.ObjectId;
  paymentSum: number;
  paymentDate: Date;
  contractNumber?: string;
  contract: Types.ObjectId;
}

export interface I_Work {
  _id?: string;
  workName: string;
  unitName?: string;
  unit: Types.ObjectId;
  groupWorkName?: string;
  groupWork: Types.ObjectId[];
  priceWorker: number;
  priceClient?: number;
}

export interface I_Product {
  _id?: string;
  productName: string;
  unitName?: string;
  unit: Types.ObjectId;
  groupProductName?: string;
  groupProduct: Types.ObjectId[];
  priceBuy: number;
  priceSell?: number;
  normPerOne: number;
  amountInPackage: number;
  weight?: number;
  height?: number;
  width?: number;
  length?: number;
}

export interface I_Worker {
  _id?: string;
  firstName: string;
  patronymic?: string;
  lastName: string;
  workerRole: Types.ObjectId;
  passportSeries?: string;
  passportNumber?: string;
  representedBy?: string;
  whenIssued?: Date;
  birthDay?: Date;
}

export interface I_Contract {
  _id?: string;
  ourFirmName?: string;
  ourFirm: Types.ObjectId;
  clientName?: string;
  client: Types.ObjectId;
  contractNumber: string;
  contractDate: Date;
  contractDescription: string;
  workAddress: string;
  contractTypeName?: string;
  contractType: Types.ObjectId;
  paymentSourceName?: string;
  paymentSource: Types.ObjectId;
}

export interface I_Expense {
  _id?: string;
  expenseDescription: string;
  groupExpenseName?: string;
  groupExpense: Types.ObjectId;
  expenseSum: number;
  expenseDate: Date;
  responsiblePersonLastName?: string;
  responsiblePerson: Types.ObjectId;
}

export interface I_BankIncome {
  _id?: string;
  ourFirmName?: string;
  ourFirm: Types.ObjectId;
  clientName?: string;
  client: Types.ObjectId;
  contractNumber?: string;
  contract?: Types.ObjectId;
  paymentSum: number;
  paymentDate: Date;
}

export interface I_Report_Deal {
  _id?: string;
  contractNumber: Types.ObjectId;
  totalSum: number;
  tax: number;
  additionalExpense: number;
  productSum: number;
  workSum: number;
  responsiblePersonName?: string;
  responsiblePerson: Types.ObjectId;
  workerLastName?: string;
  worker: Types.ObjectId;
  income?: number;
}
