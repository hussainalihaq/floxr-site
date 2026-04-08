export interface Employee {
  id: string;
  name: string;
  role: string;
  avatar: string;
  initials?: string;
  initialsColor?: string;
  baseSalary: number;
  overtime: number;
  tax: number;
  netPay: number;
}

export interface Department {
  name: string;
  headcount: number;
  totalCost: number;
  allocation: number;
  color: string;
}

export interface SummaryStats {
  totalGrossPay: number;
  grossPayChange: number;
  netPayDisbursed: number;
  netPayProgress: number;
  totalTaxes: number;
  totalDeductions: number;
}