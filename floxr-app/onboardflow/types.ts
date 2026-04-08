export interface Candidate {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  department: string;
  startDate: string;
  recruiter: string;
  location: string;
  progress: number;
}

export type TimelineStatus = 'completed' | 'in-progress' | 'pending' | 'locked';

export interface TimelineEvent {
  id: string;
  date?: string;
  time?: string;
  title: string;
  description: string;
  status: TimelineStatus;
  statusLabel: string; // e.g., "Completed", "Shipped"
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
  isActionRequired?: boolean;
  isPendingCandidate?: boolean;
  status: 'completed' | 'action_required' | 'pending';
}