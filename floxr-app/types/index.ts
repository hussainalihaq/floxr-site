export interface Employee {
    id: string
    email: string
    firstName: string
    lastName: string
    phone?: string
    role?: string
    departmentId?: string
    companyId: string
    salary?: number
    hourlyRate?: number
    employmentType: string
    startDate: Date
    endDate?: Date
    status: string
    createdAt: Date
    updatedAt: Date
}

export interface Company {
    id: string
    name: string
    email: string
    createdAt: Date
    updatedAt: Date
}

export interface Department {
    id: string
    name: string
    companyId: string
    createdAt: Date
}

export interface Timesheet {
    id: string
    employeeId: string
    clockIn: Date
    clockOut?: Date
    hoursWorked?: number
    status: string
    notes?: string
    createdAt: Date
    updatedAt: Date
}

export interface LeaveRequest {
    id: string
    employeeId: string
    startDate: Date
    endDate: Date
    leaveType: string
    status: string
    reason?: string
    days: number
    approvedBy?: string
    createdAt: Date
    updatedAt: Date
}
