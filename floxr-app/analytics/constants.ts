import { Users, Handshake, Timer, Smile } from 'lucide-react';
import { StatMetric, PipelineStage, DepartmentData, OnboardingData, AttendanceData } from './types';

export const METRICS: StatMetric[] = [
  {
    title: "Total Headcount",
    value: "4,258",
    change: "8.4%",
    changeType: "positive",
    comparisonText: "vs 3,928 last month",
    icon: Users,
    iconColorClass: "text-primary"
  },
  {
    title: "Retention Rate",
    value: "94%",
    change: "2.1%",
    changeType: "positive",
    comparisonText: "Top 5% in industry",
    icon: Handshake,
    iconColorClass: "text-emerald-500"
  },
  {
    title: "Avg. Time to Hire",
    value: "18 days",
    change: "4 days",
    changeType: "positive", // It's green in the design (positive outcome, technically negative number)
    comparisonText: "Target: 21 days",
    icon: Timer,
    iconColorClass: "text-orange-500"
  },
  {
    title: "Employee Happiness",
    value: "4.8/5",
    change: "", 
    changeType: "neutral",
    comparisonText: "Based on recent eNPS",
    icon: Smile,
    iconColorClass: "text-purple-500"
  }
];

export const PIPELINE_DATA: PipelineStage[] = [
  { stage: "Applied", count: 1240, width: "100%", colorClass: "bg-blue-900/40 hover:bg-blue-900/60" },
  { stage: "Screening", count: 840, width: "75%", colorClass: "bg-blue-800/50 hover:bg-blue-800/70" },
  { stage: "Interview", count: 420, width: "50%", colorClass: "bg-blue-700/60 hover:bg-blue-700/80" },
  { stage: "Offer Sent", count: 125, width: "30%", colorClass: "bg-blue-600/70 hover:bg-blue-600/90" },
  { stage: "Hired", count: 98, width: "20%", colorClass: "bg-emerald-500 hover:bg-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.4)]" }
];

export const DEPARTMENT_DATA: DepartmentData[] = [
  { name: 'Engineering', value: 40, fill: '#135bec' },
  { name: 'Sales', value: 25, fill: '#10b981' },
  { name: 'Marketing', value: 20, fill: '#f59e0b' },
  { name: 'HR & Ops', value: 15, fill: '#8b5cf6' },
];

export const ONBOARDING_DATA: OnboardingData[] = [
  { month: 'Jan', completed: 20 },
  { month: 'Feb', completed: 35 },
  { month: 'Mar', completed: 45 },
  { month: 'Apr', completed: 70 },
  { month: 'May', completed: 65 },
  { month: 'Jun', completed: 90 },
];

export const ATTENDANCE_DATA: AttendanceData[] = [
  { department: 'Eng', rate: 92 },
  { department: 'Sales', rate: 85 },
  { department: 'Marketing', rate: 96 },
  { department: 'Product', rate: 88 },
  { department: 'Support', rate: 98, isHighPerformer: true },
];