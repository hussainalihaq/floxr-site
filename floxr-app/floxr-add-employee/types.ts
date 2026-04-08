export type EmployeeStatus = 'Active' | 'Onboarding' | 'Offboarding';
export type Department = 'Engineering' | 'Design' | 'Marketing' | 'Human Resources' | 'Product' | 'Growth' | 'Infrastructure' | 'People Ops';

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: Department | string;
  status: EmployeeStatus;
  avatarUrl?: string;
  initials?: string;
  initialsColor?: string; // e.g., 'bg-blue-100 text-blue-600'
  equipment: string;
  equipmentIcon: string;
  progress: number; // 0 to 100
  exitPending?: boolean;
}

export interface FilterState {
  search: string;
  tab: 'All' | 'Onboarding' | 'Active' | 'Offboarding';
}