export interface Employee {
  id: string;
  name: string;
  role: 'Full-Time' | 'Consultant';
  department: string;
  gross: number;
  deductions: number;
  net: number;
  method: 'Direct Deposit' | 'Wire Transfer' | 'Check';
  status: 'Paid' | 'Processing' | 'Pending Approval';
  avatar?: string;
  initials?: string;
  initialsColor?: string;
}

export interface StatCardProps {
  title: string;
  value: string;
  subValue?: string;
  subLabel?: string;
  icon: string;
  iconColorClass: string;
  trend?: string;
  progress?: number;
}
