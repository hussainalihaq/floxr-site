// Types for Onboarding Detail View

export interface OnboardingCandidate {
    id: string;
    name: string;
    role: string;
    avatarUrl?: string;
    initials?: string;
    department: string;
    startDate: string;
    recruiter: string;
    location: string;
    progress: number;
    email: string;
}

export type TimelineStatus = 'completed' | 'in-progress' | 'pending' | 'locked';

export interface TimelineEvent {
    id: string;
    date?: string;
    time?: string;
    title: string;
    description: string;
    status: TimelineStatus;
    statusLabel: string;
    icon: 'email' | 'badge' | 'shipping' | 'group' | 'training';
    meta?: {
        triggeredBy?: string;
        trackingNumber?: string;
        eventDate?: string;
        avatarUrl?: string;
    };
}

export interface DocumentItem {
    id: string;
    title: string;
    completedDate?: string;
    status: 'completed' | 'action_required' | 'pending';
}
