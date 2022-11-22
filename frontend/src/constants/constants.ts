export const roles = [
  {
    value: 'user',
    caption: 'Пользователь',
  },
  {
    value: 'worker',
    caption: 'Работник',
  },
  {
    value: 'client',
    caption: 'Клиент',
  },
  {
    value: 'partner',
    caption: 'Партнер',
  },
  {
    value: 'seller',
    caption: 'Продавец',
  },
  {
    value: 'engineer',
    caption: 'Инженер',
  },
  {
    value: 'accountant',
    caption: 'Бухгалтер',
  },
  {
    value: 'manager',
    caption: 'Менеджер',
  },
  {
    value: 'boss',
    caption: 'Руководитель',
  },
];

const linkRefdata = '/refdata';

export const refData_links = [
  {
    link: `${linkRefdata}/unit`,
    caption: `unit`,
  },
  {
    link: `${linkRefdata}/firmtype`,
    caption: `firmtype`,
  },
  {
    link: `${linkRefdata}/taxationtype`,
    caption: `taxationtype`,
  },
  {
    link: `${linkRefdata}/groupwork`,
    caption: `groupwork`,
  },
  {
    link: `${linkRefdata}/groupproduct`,
    caption: `groupproduct`,
  },
  {
    link: `${linkRefdata}/workerrole`,
    caption: `workerrole`,
  },
  {
    link: `${linkRefdata}/contracttype`,
    caption: `contracttype`,
  },
  {
    link: `${linkRefdata}/paymentsource`,
    caption: `paymentsource`,
  },
  {
    link: `${linkRefdata}/groupexpense`,
    caption: `groupexpense`,
  },
  {
    link: `${linkRefdata}/clienttype`,
    caption: `clienttype`,
  },
  {
    link: `${linkRefdata}/producttype`,
    caption: `producttype`,
  },
  {
    link: `${linkRefdata}/clients`,
    caption: `clients`,
  },
  {
    link: `${linkRefdata}/contract`,
    caption: `contract`,
  },
  {
    link: `${linkRefdata}/worker`,
    caption: `worker`,
  },
  {
    link: `${linkRefdata}/products`,
    caption: `products`,
  },
  {
    link: `${linkRefdata}/servicework`,
    caption: `servicework`,
  },
  {
    link: `${linkRefdata}/storehouse`,
    caption: `storehouse`,
  },
  {
    link: `${linkRefdata}/group-thirdparty-service`,
    caption: `group-thirdparty-service`,
  },
  {
    link: `${linkRefdata}/thirdparty-service`,
    caption: `thirdparty-service`,
  },
];

const linkAccounting = '/accounting';

export const accounting_links = [
  {
    link: `${linkAccounting}/salarypayment`,
    caption: `salarypayment`,
  },
  {
    link: `${linkAccounting}/expense`,
    caption: `expense`,
  },
  {
    link: `${linkAccounting}/bankincome`,
    caption: `bankincome`,
  },
  {
    link: `${linkAccounting}/paymenttosupplier`,
    caption: `paymenttosupplier`,
  },
  {
    link: `${linkAccounting}/documentnakladnaya`,
    caption: `documentnakladnaya`,
  },
  {
    link: `${linkAccounting}/documentaktofwork`,
    caption: `documentaktofwork`,
  },
];

export const all_roles = [
  'user',
  'worker',
  'client',
  'partner',
  'seller',
  'engineer',
  'accountant',
  'manager',
  'boss',
  'admin',
];

export const worker_role = [
  'worker',
  'seller',
  'engineer',
  'accountant',
  'manager',
  'boss',
  'admin',
];

export const client_role = [
  'client',
  'seller',
  'engineer',
  'accountant',
  'manager',
  'boss',
  'admin',
];

export const partner_role = [
  'partner',
  'accountant',
  'manager',
  'boss',
  'admin',
];

export const seller_role = [
  'seller',
  'engineer',
  'accountant',
  'manager',
  'boss',
  'admin',
];

export const engineer_role = [
  'engineer',
  'accountant',
  'manager',
  'boss',
  'admin',
];

export const accountant_role = ['accountant', 'manager', 'boss', 'admin'];

export const manager_role = ['manager', 'boss', 'admin'];

export const boss_role = ['boss', 'admin'];
