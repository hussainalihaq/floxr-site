import { Employee, EmploymentType, PaymentMethod, PaymentStatus, KPICardProps } from './types';

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUog3FFs9wLHwhNjAmdK4IBgdlRzx8XnKaw79aTw0XHRCZuRc8gvLoWCBJ-G84maJAf42jR5ttZBIraP6LgUv7JWFiygffjnZZZ_6kEOa_QoEevhiOioRaTOn0ypysgD-QvhXD4pOXKMNmyssaKdALrHoqp6rDxClCuEGR3U99sjthASN7sQBSmcp-I4OO19rhP_yLj-DGT1twuqnR5E1pB9xzysOxlAMU8yTeTqgVyFMb-imkI8lWSAFdPckkV2oeO2JF_--R_mo',
    role: 'Full-Time',
    type: EmploymentType.FULL_TIME,
    department: 'Engineering',
    departmentColorClass: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    grossPay: 5000.00,
    deductions: 500.00,
    netPay: 4500.00,
    paymentMethod: PaymentMethod.DIRECT_DEPOSIT,
    status: PaymentStatus.PAID
  },
  {
    id: '2',
    name: 'Emily Chen',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChQc1kFAF7zvaD2cyN0Z5swZjUUcrUYJxIZzR33BQTqizbh8eoSdSSSwUBzzOv_zqq2vFWUFrBmapmP61Qp0pmBUEKH8yUq8x1Go_YQsGjag8mTHMDoA43LYkNXHrIZCi5C8z_LVRhqJGeR_eH4b7RpGKvH_FysPhV1hd3e0gmZYNYbpABlnYbLYWfAT0H12XdWRD7CTc8c54XZzgT7bNOsY2O0QCh2oI8E8P3GUC1bTefbMRlTFAQFD59aTWGQOP7xgVL0am3yv8',
    role: 'Full-Time',
    type: EmploymentType.FULL_TIME,
    department: 'Design',
    departmentColorClass: 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400',
    grossPay: 4800.00,
    deductions: 480.00,
    netPay: 4320.00,
    paymentMethod: PaymentMethod.DIRECT_DEPOSIT,
    status: PaymentStatus.PROCESSING
  },
  {
    id: '3',
    name: 'Mike Ross',
    initials: 'MR',
    initialsColorClass: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
    role: 'Consultant',
    type: EmploymentType.CONSULTANT,
    department: 'Legal',
    departmentColorClass: 'bg-pink-50 text-pink-700 dark:bg-pink-500/10 dark:text-pink-400',
    grossPay: 12000.00,
    deductions: 0.00,
    netPay: 12000.00,
    paymentMethod: PaymentMethod.WIRE_TRANSFER,
    status: PaymentStatus.PENDING_APPROVAL
  },
  {
    id: '4',
    name: 'Jessica Pearson',
    initials: 'JP',
    initialsColorClass: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
    role: 'Full-Time',
    type: EmploymentType.FULL_TIME,
    department: 'Management',
    departmentColorClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    grossPay: 15000.00,
    deductions: 2000.00,
    netPay: 13000.00,
    paymentMethod: PaymentMethod.DIRECT_DEPOSIT,
    status: PaymentStatus.PAID
  },
  {
    id: '5',
    name: 'Donna Lewis',
    initials: 'DL',
    initialsColorClass: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
    role: 'Consultant',
    type: EmploymentType.CONSULTANT,
    department: 'Operations',
    departmentColorClass: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    grossPay: 4200.00,
    deductions: 420.00,
    netPay: 3780.00,
    paymentMethod: PaymentMethod.CHECK,
    status: PaymentStatus.PAID
  },
  // Extra data for pagination demo
  {
    id: '6',
    name: 'Harvey Specter',
    initials: 'HS',
    initialsColorClass: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    role: 'Full-Time',
    type: EmploymentType.FULL_TIME,
    department: 'Legal',
    departmentColorClass: 'bg-pink-50 text-pink-700 dark:bg-pink-500/10 dark:text-pink-400',
    grossPay: 20000.00,
    deductions: 3500.00,
    netPay: 16500.00,
    paymentMethod: PaymentMethod.DIRECT_DEPOSIT,
    status: PaymentStatus.PAID
  },
  {
    id: '7',
    name: 'Rachel Zane',
    initials: 'RZ',
    initialsColorClass: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
    role: 'Full-Time',
    type: EmploymentType.FULL_TIME,
    department: 'Legal',
    departmentColorClass: 'bg-pink-50 text-pink-700 dark:bg-pink-500/10 dark:text-pink-400',
    grossPay: 5500.00,
    deductions: 550.00,
    netPay: 4950.00,
    paymentMethod: PaymentMethod.DIRECT_DEPOSIT,
    status: PaymentStatus.PROCESSING
  }
];

export const KPI_DATA: KPICardProps[] = [
  {
    title: 'Total Payroll',
    value: '$125,400',
    subtext: '',
    trend: '+1.2%',
    trendPositive: true,
    icon: 'payments',
    iconColorClass: 'text-primary bg-primary/10',
    progress: 75
  },
  {
    title: 'Pending Approvals',
    value: '12',
    subtext: 'Requires admin review',
    subtextIsPrimary: true,
    icon: 'pending_actions',
    iconColorClass: 'text-amber-500 bg-amber-500/10'
  } as any, // lazy override for varying props
  {
    title: 'Taxes & Deductions',
    value: '$18,200',
    subtext: '~14.5% of Gross Pay',
    icon: 'account_balance',
    iconColorClass: 'text-purple-500 bg-purple-500/10'
  },
  {
    title: 'Next Pay Date',
    value: 'Nov 1',
    subtext: 'Auto-scheduled run',
    trend: '2023',
    icon: 'calendar_month',
    iconColorClass: 'text-emerald-500 bg-emerald-500/10'
  }
];