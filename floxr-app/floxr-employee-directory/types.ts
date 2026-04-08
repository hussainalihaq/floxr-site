export enum EmployeeStatus {
  Active = 'Active',
  Onboarding = 'Onboarding',
  Offboarding = 'Offboarding'
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: EmployeeStatus;
  equipment: string;
  equipmentIcon: string; // Material symbol name
  progress?: number; // 0-100
  exitNote?: string; // For offboarding status display
  avatarUrl?: string;
  initials?: string;
  initialsColorClass?: string; // Tailwind class string for background/text color
}