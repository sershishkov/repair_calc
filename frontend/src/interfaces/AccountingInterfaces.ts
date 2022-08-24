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

export interface I_Client {
  _id?: string;
  nameClientLong: string;
  nameClientShort: string | null;
  firmTypeLong: string;
  firmTypeShort: string;
  postIndex: number;
  address: string;
  edrpou: number | null;
  inn: number | null;
  iban: string | null;
  iban_budget: string | null;
  passport: string | null;
  firstName_imen: string;
  patronymic_imen: string;
  lastName_imen: string;
  firstName_rodit: string;
  patronymic_rodit: string;
  lastName_rodit: string;
  certificateNumber: string;
  representedBy: string;
  jobTitle: string;
  tax: number;
  taxationType: string;
  telNumber: string;
  email: string;
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

export interface I_SalaryPayment {
  _id?: string;
  workerLastName: string;
  paymentSum: number;
  paymentDate: Date;
  contractNumber?: string;
}

export interface I_OurFirm extends I_Client {
  simpleName: string;
}

export interface I_Work {
  _id?: string;
  workName: string;
  unit: string;
  groupWorkName: string;
  priceWorker?: number;
  priceClient?: number;
}

export interface I_Product {
  _id?: string;
  productName: string;
  unit: string;
  groupProductName: string;
  priceBuy?: number;
  priceSell?: number;
  normPer1?: number;
  amountInPackage?: number;
  weight?: number;
  height?: number;
  width?: number;
  length?: number;
}

export interface I_Worker {
  _id?: string;
  firstName: string;
  patronymic: string;
  lastName: string;
  workerRole: string;
  passportSeries: string;
  passportNumber: string;
  representedBy?: string;
  whenIssued?: Date;
  birthDay?: Date;
}

export interface I_Contract {
  _id?: string;
  ourFirmName: string;
  clientName: string;
  contractNumber: string;
  contractDate: Date;
  contractTypeName: string;
  paymentSource: string;
}

export interface I_Expense {
  _id?: string;
  expenseDescription: string;
  groupExpenseName: string;
  expenseSum: number;
  expenseDate: Date;
  responsiblePerson: string;
}

export interface I_Deal {
  _id?: string;
  ourFirmName: string;
  clientName: string;
  workAddress: string;
  workDescription: string;
  contractNumber: string;
  groupExpenseName: string;
  totalSum: number;
  tax: number;
  additionalExpense: number;
  productSum: number;
  workSum: number;
  responsiblePerson: string;
  workerLastName: string;
  income?: number;
}

export interface I_BankIncome {
  _id?: string;
  ourFirmName: string;
  clientName: string;
  contractNumber?: string;
  paymentSum: number;
  paymentDate: Date;
}
