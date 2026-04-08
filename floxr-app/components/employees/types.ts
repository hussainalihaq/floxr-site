export enum EmployeeStatus {
    ACTIVE = 'ACTIVE',
    ONBOARDING = 'ONBOARDING',
    OFFBOARDING = 'OFFBOARDING'
}

export interface EmployeeData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string | null;
    department: {
        id: string;
        name: string;
    } | null;
    status: string;
    onboardingProgress: number;
    avatar?: string;
}

export interface TabCount {
    all: number;
    onboarding: number;
    active: number;
    offboarding: number;
}
