export type AttendanceStatus = 'Present' | 'Late' | 'Absent' | 'WFH';

export interface AttendanceEmployee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    department: { name: string } | null;
    avatar?: string;
}

export interface AttendanceRecord {
    id: string;
    employeeId: string;
    employee: {
        id: string;
        firstName: string;
        lastName: string;
    };
    clockIn: string;
    clockOut: string | null;
    hoursWorked: number | null;
    status: string;
    notes: string | null;
}

export interface AttendanceStats {
    totalPresent: number;
    totalEmployees: number;
    clockedIn: number;
    totalHoursToday: number;
    onLeave: number;
    lateArrivals: number;
    wfh: number;
}
