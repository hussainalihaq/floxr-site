import { PayrollEmployee, EmploymentType, PaymentMethod, PaymentStatus, KPICardProps } from './types';
import { DollarSign, Clock, Building2, Calendar } from 'lucide-react';
import React from 'react';

export const MOCK_PAYROLL_EMPLOYEES: PayrollEmployee[] = [
    {
        id: '1',
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80',
        role: 'Full-Time',
        type: EmploymentType.FULL_TIME,
        department: 'Engineering',
        departmentColorClass: 'bg-blue-500/10 text-blue-400',
        grossPay: 5000.00,
        deductions: 500.00,
        netPay: 4500.00,
        paymentMethod: PaymentMethod.DIRECT_DEPOSIT,
        status: PaymentStatus.PAID
    },
    {
        id: '2',
        name: 'Emily Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
        role: 'Full-Time',
        type: EmploymentType.FULL_TIME,
        department: 'Design',
        departmentColorClass: 'bg-purple-500/10 text-purple-400',
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
        initialsColorClass: 'bg-indigo-900/30 text-indigo-400',
        role: 'Consultant',
        type: EmploymentType.CONSULTANT,
        department: 'Legal',
        departmentColorClass: 'bg-pink-500/10 text-pink-400',
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
        initialsColorClass: 'bg-slate-800 text-slate-400',
        role: 'Full-Time',
        type: EmploymentType.FULL_TIME,
        department: 'Management',
        departmentColorClass: 'bg-emerald-500/10 text-emerald-400',
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
        initialsColorClass: 'bg-orange-900/30 text-orange-400',
        role: 'Consultant',
        type: EmploymentType.CONSULTANT,
        department: 'Operations',
        departmentColorClass: 'bg-blue-500/10 text-blue-400',
        grossPay: 4200.00,
        deductions: 420.00,
        netPay: 3780.00,
        paymentMethod: PaymentMethod.CHECK,
        status: PaymentStatus.PAID
    },
    {
        id: '6',
        name: 'Harvey Specter',
        initials: 'HS',
        initialsColorClass: 'bg-blue-900/30 text-blue-400',
        role: 'Full-Time',
        type: EmploymentType.FULL_TIME,
        department: 'Legal',
        departmentColorClass: 'bg-pink-500/10 text-pink-400',
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
        initialsColorClass: 'bg-rose-900/30 text-rose-400',
        role: 'Full-Time',
        type: EmploymentType.FULL_TIME,
        department: 'Legal',
        departmentColorClass: 'bg-pink-500/10 text-pink-400',
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
        icon: React.createElement(DollarSign, { className: 'w-5 h-5' }),
        iconColorClass: 'text-[#2463eb] bg-[#2463eb]/10',
        progress: 75
    },
    {
        title: 'Pending Approvals',
        value: '12',
        subtext: 'Requires admin review',
        icon: React.createElement(Clock, { className: 'w-5 h-5' }),
        iconColorClass: 'text-amber-500 bg-amber-500/10'
    },
    {
        title: 'Taxes & Deductions',
        value: '$18,200',
        subtext: '~14.5% of Gross Pay',
        icon: React.createElement(Building2, { className: 'w-5 h-5' }),
        iconColorClass: 'text-purple-500 bg-purple-500/10'
    },
    {
        title: 'Next Pay Date',
        value: 'Feb 1',
        subtext: 'Auto-scheduled run',
        trend: '2025',
        icon: React.createElement(Calendar, { className: 'w-5 h-5' }),
        iconColorClass: 'text-emerald-500 bg-emerald-500/10'
    }
];
