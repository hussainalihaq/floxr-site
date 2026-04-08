export interface Candidate {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  roleIcon: string;
  stageName: string;
  stageProgress: number; // 0-100
  stageColor: 'primary' | 'purple' | 'orange' | 'emerald';
  stageDetail: string;
  assignedTo: string; // Avatar URL or Initials
  tasksCompleted: number;
  totalTasks: number;
  taskStatus: 'checked' | 'pending' | 'blocked' | 'done';
  dueDate: string;
  isDueDateUrgent?: boolean;
}

export interface StatCardProps {
  step: number;
  title: string;
  count: number;
  subtitle: string;
  color: 'primary' | 'purple' | 'orange' | 'emerald';
  progress: number;
  icon: string;
}
