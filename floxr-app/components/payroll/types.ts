export enum EmploymentType {
    FULL_TIME = 'FULL_TIME',
    CONSULTANT = 'CONSULTANT'
}

export enum PaymentMethod {
    DIRECT_DEPOSIT = 'Direct Deposit',
    WIRE_TRANSFER = 'Wire Transfer',
    CHECK = 'Check'
}

export enum PaymentStatus {
    PAID = 'Paid',
    PROCESSING = 'Processing',
    PENDING_APPROVAL = 'Pending Approval'
}

export interface PayrollEmployee {
    id: string;
    name: string;
    avatar?: string;
    initials?: string;
    initialsColorClass?: string;
    role: string;
    type: EmploymentType;
    department: string;
    departmentColorClass: string;
    grossPay: number;
    deductions: number;
    netPay: number;
    paymentMethod: PaymentMethod;
    status: PaymentStatus;
}

export interface KPICardProps {
    title: string;
    value: string;
    subtext: string;
    trend?: string;
    trendPositive?: boolean;
    icon: React.ReactNode;
    iconColorClass: string;
    progress?: number;
}
