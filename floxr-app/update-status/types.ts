export interface Candidate {
  name: string;
  role: string;
  image: string;
  department: string;
  startDate: string;
  recruiter: string;
  location: string;
  progress: number;
  stage: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  status: 'completed' | 'action_required' | 'pending';
  date?: string;
  completed?: boolean;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'scheduled' | 'locked';
  date: string;
  time?: string;
  icon: string;
  iconColorClass: string;
  bgColorClass?: string; // For the icon background
  borderColorClass?: string; // For the card border
  meta?: {
    userImage?: string;
    userName?: string;
    trackingId?: string;
    provider?: string;
    icons?: string[]; // list of icon names
  };
}

export interface UpdateStatusPayload {
  stage: string;
  progress: number;
  note: string;
  actions: {
    markDocs: boolean;
    sendEmail: boolean;
    notifyTeam: boolean;
    assignEquipment: boolean;
  }
}