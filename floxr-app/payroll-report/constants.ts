import { Department, Employee, SummaryStats } from './types';

export const SUMMARY_STATS: SummaryStats = {
  totalGrossPay: 125400.00,
  grossPayChange: 2.4,
  netPayDisbursed: 102200.00,
  netPayProgress: 82,
  totalTaxes: 18200.00,
  totalDeductions: 5000.00,
};

export const DEPARTMENTS: Department[] = [
  { name: 'Engineering', headcount: 42, totalCost: 68200.00, allocation: 55, color: 'bg-blue-500' },
  { name: 'Sales & Marketing', headcount: 28, totalCost: 34500.00, allocation: 28, color: 'bg-purple-500' },
  { name: 'Operations', headcount: 15, totalCost: 12400.00, allocation: 10, color: 'bg-orange-500' },
  { name: 'Product', headcount: 15, totalCost: 10300.00, allocation: 7, color: 'bg-emerald-500' },
];

export const EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Senior Engineer',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUog3FFs9wLHwhNjAmdK4IBgdlRzx8XnKaw79aTw0XHRCZuRc8gvLoWCBJ-G84maJAf42jR5ttZBIraP6LgUv7JWFiygffjnZZZ_6kEOa_QoEevhiOioRaTOn0ypysgD-QvhXD4pOXKMNmyssaKdALrHoqp6rDxClCuEGR3U99sjthASN7sQBSmcp-I4OO19rhP_yLj-DGT1twuqnR5E1pB9xzysOxlAMU8yTeTqgVyFMb-imkI8lWSAFdPckkV2oeO2JF_--R_mo',
    baseSalary: 5000.00,
    overtime: 0.00,
    tax: -500.00,
    netPay: 4500.00
  },
  {
    id: '2',
    name: 'Emily Chen',
    role: 'Product Designer',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChQc1kFAF7zvaD2cyN0Z5swZjUUcrUYJxIZzR33BQTqizbh8eoSdSSSwUBzzOv_zqq2vFWUFrBmapmP61Qp0pmBUEKH8yUq8x1Go_YQsGjag8mTHMDoA43LYkNXHrIZCi5C8z_LVRhqJGeR_eH4b7RpGKvH_FysPhV1hd3e0gmZYNYbpABlnYbLYWfAT0H12XdWRD7CTc8c54XZzgT7bNOsY2O0QCh2oI8E8P3GUC1bTefbMRlTFAQFD59aTWGQOP7xgVL0am3yv8',
    baseSalary: 4500.00,
    overtime: 300.00,
    tax: -480.00,
    netPay: 4320.00
  },
  {
    id: '3',
    name: 'Mike Ross',
    role: 'Legal Consultant',
    avatar: '',
    initials: 'MR',
    initialsColor: 'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30',
    baseSalary: 12000.00,
    overtime: 0.00,
    tax: 0.00,
    netPay: 12000.00
  },
  {
    id: '4',
    name: 'Jessica Pearson',
    role: 'Managing Partner',
    avatar: '',
    initials: 'JP',
    initialsColor: 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800',
    baseSalary: 15000.00,
    overtime: 0.00,
    tax: -2000.00,
    netPay: 13000.00
  },
  {
    id: '5',
    name: 'Donna Lewis',
    role: 'Operations Manager',
    avatar: '',
    initials: 'DL',
    initialsColor: 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30',
    baseSalary: 4200.00,
    overtime: 0.00,
    tax: -420.00,
    netPay: 3780.00
  }
];

export const CHART_DATA = [
  { name: 'Net Pay', value: 81.5, color: '#10b981' },
  { name: 'Taxes', value: 14.5, color: '#3b82f6' },
  { name: 'Deductions', value: 4.0, color: '#ef4444' },
];