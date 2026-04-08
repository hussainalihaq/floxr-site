export interface NavItem {
    icon: string;
    label: string;
    active?: boolean;
}

export interface ActivityItem {
    id: string;
    user?: {
        name: string;
        avatar?: string;
        initial?: string;
    };
    type: 'update' | 'notification' | 'alert';
    title: string;
    description: React.ReactNode;
    time: string;
    isOnline?: boolean;
}

export interface WorkflowStep {
    id: string;
    label: string;
    subLabel: string;
    status: 'completed' | 'in-progress' | 'pending' | 'locked';
    icon: string;
}
