import { AttendanceRecord } from './types';

export const DEPARTMENTS = {
  ENGINEERING: 'Engineering',
  DESIGN: 'Design',
  LEGAL: 'Legal',
  MANAGEMENT: 'Management',
  OPERATIONS: 'Operations',
  MARKETING: 'Marketing',
  SALES: 'Sales',
};

export const MOCK_DATA: AttendanceRecord[] = [
  {
    id: '1',
    employee: {
      id: '#EMP-001',
      name: 'John Doe',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUog3FFs9wLHwhNjAmdK4IBgdlRzx8XnKaw79aTw0XHRCZuRc8gvLoWCBJ-G84maJAf42jR5ttZBIraP6LgUv7JWFiygffjnZZZ_6kEOa_QoEevhiOioRaTOn0ypysgD-QvhXD4pOXKMNmyssaKdALrHoqp6rDxClCuEGR3U99sjthASN7sQBSmcp-I4OO19rhP_yLj-DGT1twuqnR5E1pB9xzysOxlAMU8yTeTqgVyFMb-imkI8lWSAFdPckkV2oeO2JF_--R_mo',
      department: DEPARTMENTS.ENGINEERING,
      role: 'Senior Engineer'
    },
    date: '2023-10-24',
    clockIn: '09:00 AM',
    clockOut: '05:30 PM',
    totalHours: '8h 30m',
    status: 'Present'
  },
  {
    id: '2',
    employee: {
      id: '#EMP-042',
      name: 'Emily Chen',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChQc1kFAF7zvaD2cyN0Z5swZjUUcrUYJxIZzR33BQTqizbh8eoSdSSSwUBzzOv_zqq2vFWUFrBmapmP61Qp0pmBUEKH8yUq8x1Go_YQsGjag8mTHMDoA43LYkNXHrIZCi5C8z_LVRhqJGeR_eH4b7RpGKvH_FysPhV1hd3e0gmZYNYbpABlnYbLYWfAT0H12XdWRD7CTc8c54XZzgT7bNOsY2O0QCh2oI8E8P3GUC1bTefbMRlTFAQFD59aTWGQOP7xgVL0am3yv8',
      department: DEPARTMENTS.DESIGN,
      role: 'Product Designer'
    },
    date: '2023-10-24',
    clockIn: '09:15 AM',
    clockOut: '05:45 PM',
    totalHours: '8h 30m',
    status: 'Late'
  },
  {
    id: '3',
    employee: {
      id: '#EMP-108',
      name: 'Mike Ross',
      initials: 'MR',
      department: DEPARTMENTS.LEGAL,
      role: 'Legal Associate'
    },
    date: '2023-10-24',
    clockIn: null,
    clockOut: null,
    totalHours: '0h 00m',
    status: 'Absent'
  },
  {
    id: '4',
    employee: {
      id: '#EMP-005',
      name: 'Jessica Pearson',
      initials: 'JP',
      department: DEPARTMENTS.MANAGEMENT,
      role: 'Managing Partner'
    },
    date: '2023-10-24',
    clockIn: '08:30 AM',
    clockOut: '06:00 PM',
    totalHours: '9h 30m',
    status: 'WFH'
  },
  {
    id: '5',
    employee: {
      id: '#EMP-088',
      name: 'Donna Lewis',
      initials: 'DL',
      department: DEPARTMENTS.OPERATIONS,
      role: 'COO'
    },
    date: '2023-10-24',
    clockIn: '08:55 AM',
    clockOut: '05:05 PM',
    totalHours: '8h 10m',
    status: 'Present'
  },
  // Additional mock data for pagination
  {
    id: '6',
    employee: {
      id: '#EMP-092',
      name: 'Harvey Specter',
      initials: 'HS',
      department: DEPARTMENTS.LEGAL,
      role: 'Senior Partner'
    },
    date: '2023-10-24',
    clockIn: '08:00 AM',
    clockOut: '07:00 PM',
    totalHours: '11h 00m',
    status: 'Present'
  },
  {
    id: '7',
    employee: {
      id: '#EMP-112',
      name: 'Louis Litt',
      initials: 'LL',
      department: DEPARTMENTS.LEGAL,
      role: 'Junior Partner'
    },
    date: '2023-10-24',
    clockIn: '07:30 AM',
    clockOut: '05:30 PM',
    totalHours: '10h 00m',
    status: 'Present'
  },
  {
    id: '8',
    employee: {
      id: '#EMP-155',
      name: 'Rachel Zane',
      avatar: 'https://picsum.photos/100/100?random=8',
      department: DEPARTMENTS.LEGAL,
      role: 'Paralegal'
    },
    date: '2023-10-24',
    clockIn: '09:05 AM',
    clockOut: '05:00 PM',
    totalHours: '7h 55m',
    status: 'Late'
  },
  {
    id: '9',
    employee: {
      id: '#EMP-199',
      name: 'Katrina Bennett',
      initials: 'KB',
      department: DEPARTMENTS.LEGAL,
      role: 'Associate'
    },
    date: '2023-10-24',
    clockIn: null,
    clockOut: null,
    totalHours: '0h 00m',
    status: 'Absent'
  },
  {
    id: '10',
    employee: {
      id: '#EMP-201',
      name: 'Alex Williams',
      initials: 'AW',
      department: DEPARTMENTS.LEGAL,
      role: 'Partner'
    },
    date: '2023-10-24',
    clockIn: '09:00 AM',
    clockOut: '05:00 PM',
    totalHours: '8h 00m',
    status: 'WFH'
  },
   {
    id: '11',
    employee: {
      id: '#EMP-222',
      name: 'Robert Zane',
      initials: 'RZ',
      department: DEPARTMENTS.MANAGEMENT,
      role: 'Partner'
    },
    date: '2023-10-24',
    clockIn: '10:00 AM',
    clockOut: '04:00 PM',
    totalHours: '6h 00m',
    status: 'Present'
  },
];
