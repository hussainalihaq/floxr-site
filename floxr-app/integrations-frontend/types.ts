export type IntegrationCategory = 'All Apps' | 'Communication' | 'Productivity' | 'Payroll';

export interface Integration {
  id: string;
  name: string;
  description: string;
  iconName: string;
  iconBgColor: string; // Tailwind class like 'bg-slack'
  categories: IntegrationCategory[];
  isConnected: boolean;
  autoSync?: boolean;
  lastSync?: string;
  // Specific visual tweaks
  hasGradientOverlay?: boolean;
  customIconColor?: string;
}

export interface SidebarLink {
  icon: string;
  label: string;
  isActive?: boolean;
}