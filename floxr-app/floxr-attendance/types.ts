export type AttendanceStatus = 'Present' | 'Late' | 'Absent' | 'WFH';

export interface Employee {
  id: string;
  name: string;
  avatar?: string;
  initials?: string;
  department: string;
  role: string;
}

export interface AttendanceRecord {
  id: string;
  employee: Employee;
  date: string;
  clockIn: string | null;
  clockOut: string | null;
  totalHours: string;
  status: AttendanceStatus;
}

export interface Stats {
  totalPresent: number;
  totalEmployees: number;
  onLeave: number;
  lateArrivals: number;
  wfh: number;
}