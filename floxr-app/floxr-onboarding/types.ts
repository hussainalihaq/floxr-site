export interface Candidate {
    id: string;
    name: string;
    email: string;
    avatar: string;
    initials?: string;
    initialsColor?: string;
    role: string;
    roleIcon: string;
    stage: {
        name: string;
        current: number;
        total: number;
        color: string;
        subText: string;
    };
    assignedTo: {
        name: string;
        avatar?: string;
        initials?: string;
    };
    tasks: {
        completed: number;
        total: number;
        status: 'blocked' | 'done' | 'pending' | 'in-progress';
    };
    dueDate: string;
    isOverdue?: boolean;
}

export interface PipelineStat {
    id: string;
    step: number;
    title: string;
    count: number;
    subtitle: string;
    color: string;
    progress: number;
    icon: string;
}

export interface NavItem {
    label: string;
    icon: string;
    active?: boolean;
    isButton?: boolean;
}