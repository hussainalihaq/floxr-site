export type IntegrationCategory = 'All Apps' | 'Communication' | 'Productivity' | 'Payroll';

export interface Integration {
    id: string;
    name: string;
    description: string;
    iconName: string;
    iconBgColor: string;
    categories: IntegrationCategory[];
    isConnected: boolean;
    autoSync?: boolean;
    lastSync?: string;
    hasGradientOverlay?: boolean;
    customIconColor?: string;
}
