import { LucideIcon } from 'lucide-react';

export interface StatMetric {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  comparisonText: string;
  icon: LucideIcon;
  iconColorClass: string;
}

export interface PipelineStage {
  stage: string;
  count: number;
  width: string; // Percentage for width
  colorClass: string;
}

export interface DepartmentData {
  name: string;
  value: number;
  fill: string;
}

export interface OnboardingData {
  month: string;
  completed: number;
}

export interface AttendanceData {
  department: string;
  rate: number;
  isHighPerformer?: boolean;
}