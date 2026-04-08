import { Employee, EmployeeStatus } from './types';

export const EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@floxr.com',
    role: 'Senior Product Designer',
    department: 'Design System',
    status: EmployeeStatus.Active,
    equipment: 'MacBook Pro 16"',
    equipmentIcon: 'laptop_mac',
    progress: 100,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUog3FFs9wLHwhNjAmdK4IBgdlRzx8XnKaw79aTw0XHRCZuRc8gvLoWCBJ-G84maJAf42jR5ttZBIraP6LgUv7JWFiygffjnZZZ_6kEOa_QoEevhiOioRaTOn0ypysgD-QvhXD4pOXKMNmyssaKdALrHoqp6rDxClCuEGR3U99sjthASN7sQBSmcp-I4OO19rhP_yLj-DGT1twuqnR5E1pB9xzysOxlAMU8yTeTqgVyFMb-imkI8lWSAFdPckkV2oeO2JF_--R_mo'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'm.chen@floxr.com',
    role: 'Frontend Developer',
    department: 'Engineering',
    status: EmployeeStatus.Onboarding,
    equipment: 'MacBook Pro 14"',
    equipmentIcon: 'laptop_mac',
    progress: 45,
    initials: 'MC',
    initialsColorClass: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily.d@floxr.com',
    role: 'Marketing Manager',
    department: 'Growth',
    status: EmployeeStatus.Offboarding,
    equipment: 'Dell XPS + Monitor',
    equipmentIcon: 'dock',
    exitNote: 'Exit Pending',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChQc1kFAF7zvaD2cyN0Z5swZjUUcrUYJxIZzR33BQTqizbh8eoSdSSSwUBzzOv_zqq2vFWUFrBmapmP61Qp0pmBUEKH8yUq8x1Go_YQsGjag8mTHMDoA43LYkNXHrIZCi5C8z_LVRhqJGeR_eH4b7RpGKvH_FysPhV1hd3e0gmZYNYbpABlnYbLYWfAT0H12XdWRD7CTc8c54XZzgT7bNOsY2O0QCh2oI8E8P3GUC1bTefbMRlTFAQFD59aTWGQOP7xgVL0am3yv8'
  },
  {
    id: '4',
    name: 'James Rodriguez',
    email: 'james.r@floxr.com',
    role: 'DevOps Engineer',
    department: 'Infrastructure',
    status: EmployeeStatus.Onboarding,
    equipment: 'ThinkPad X1',
    equipmentIcon: 'laptop_mac',
    progress: 15,
    initials: 'JR',
    initialsColorClass: 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400'
  },
  {
    id: '5',
    name: 'Amanda Lee',
    email: 'amanda.l@floxr.com',
    role: 'HR Specialist',
    department: 'People Ops',
    status: EmployeeStatus.Active,
    equipment: 'iMac 24"',
    equipmentIcon: 'desktop_mac',
    progress: 100,
    initials: 'AL',
    initialsColorClass: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
  }
];