import { Candidate, PipelineStat, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard' },
    { label: 'Employees', icon: 'group' },
    { label: 'Onboarding', icon: 'person_add', active: true, isButton: true },
    { label: 'Workflows', icon: 'schema' },
    { label: 'Integrations', icon: 'link' },
    { label: 'Analytics', icon: 'bar_chart' },
    { label: 'Attendance', icon: 'calendar_month' },
    { label: 'Payroll', icon: 'payments' },
    { label: 'Users & Access', icon: 'admin_panel_settings' },
    { label: 'Settings', icon: 'settings' },
];

export const PIPELINE_STATS: PipelineStat[] = [
    {
        id: '1',
        step: 1,
        title: 'Offer Sent',
        count: 12,
        subtitle: 'candidates',
        color: 'purple', // purple-500
        progress: 40,
        icon: 'send'
    },
    {
        id: '2',
        step: 2,
        title: 'Doc Collection',
        count: 8,
        subtitle: 'candidates',
        color: 'primary', // blue-600/primary
        progress: 65,
        icon: 'description'
    },
    {
        id: '3',
        step: 3,
        title: 'IT Provisioning',
        count: 5,
        subtitle: 'candidates',
        color: 'orange', // orange-500
        progress: 25,
        icon: 'devices'
    },
    {
        id: '4',
        step: 4,
        title: 'First Day',
        count: 3,
        subtitle: 'starting soon',
        color: 'emerald', // emerald-500
        progress: 80,
        icon: 'celebration'
    }
];

export const CANDIDATES: Candidate[] = [
    {
        id: '1',
        name: 'Sarah Jenkins',
        email: 'sarah.j@example.com',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChQc1kFAF7zvaD2cyN0Z5swZjUUcrUYJxIZzR33BQTqizbh8eoSdSSSwUBzzOv_zqq2vFWUFrBmapmP61Qp0pmBUEKH8yUq8x1Go_YQsGjag8mTHMDoA43LYkNXHrIZCi5C8z_LVRhqJGeR_eH4b7RpGKvH_FysPhV1hd3e0gmZYNYbpABlnYbLYWfAT0H12XdWRD7CTc8c54XZzgT7bNOsY2O0QCh2oI8E8P3GUC1bTefbMRlTFAQFD59aTWGQOP7xgVL0am3yv8',
        role: 'Product Designer',
        roleIcon: 'design_services',
        stage: {
            name: 'Doc Collection',
            current: 4,
            total: 5,
            color: 'primary',
            subText: '4/5 Docs'
        },
        assignedTo: {
            name: 'HR Manager',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUog3FFs9wLHwhNjAmdK4IBgdlRzx8XnKaw79aTw0XHRCZuRc8gvLoWCBJ-G84maJAf42jR5ttZBIraP6LgUv7JWFiygffjnZZZ_6kEOa_QoEevhiOioRaTOn0ypysgD-QvhXD4pOXKMNmyssaKdALrHoqp6rDxClCuEGR3U99sjthASN7sQBSmcp-I4OO19rhP_yLj-DGT1twuqnR5E1pB9xzysOxlAMU8yTeTqgVyFMb-imkI8lWSAFdPckkV2oeO2JF_--R_mo'
        },
        tasks: {
            completed: 8,
            total: 10,
            status: 'in-progress'
        },
        dueDate: 'Oct 24, 2023'
    },
    {
        id: '2',
        name: 'Mike Ross',
        email: 'mike.ross@example.com',
        avatar: '',
        initials: 'MR',
        initialsColor: 'bg-gradient-to-br from-indigo-500 to-purple-600',
        role: 'Frontend Dev',
        roleIcon: 'code',
        stage: {
            name: 'Offer Sent',
            current: 100,
            total: 100,
            color: 'purple',
            subText: 'Awaiting Sig'
        },
        assignedTo: {
            name: 'John Doe',
            initials: 'JD'
        },
        tasks: {
            completed: 1,
            total: 3,
            status: 'pending'
        },
        dueDate: 'Oct 26, 2023'
    },
    {
        id: '3',
        name: 'Emily Chen',
        email: 'emily.c@example.com',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUog3FFs9wLHwhNjAmdK4IBgdlRzx8XnKaw79aTw0XHRCZuRc8gvLoWCBJ-G84maJAf42jR5ttZBIraP6LgUv7JWFiygffjnZZZ_6kEOa_QoEevhiOioRaTOn0ypysgD-QvhXD4pOXKMNmyssaKdALrHoqp6rDxClCuEGR3U99sjthASN7sQBSmcp-I4OO19rhP_yLj-DGT1twuqnR5E1pB9xzysOxlAMU8yTeTqgVyFMb-imkI8lWSAFdPckkV2oeO2JF_--R_mo',
        role: 'Marketing Lead',
        roleIcon: 'campaign',
        stage: {
            name: 'IT Provisioning',
            current: 20,
            total: 100,
            color: 'orange',
            subText: 'Setup'
        },
        assignedTo: {
            name: 'HR Manager',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChQc1kFAF7zvaD2cyN0Z5swZjUUcrUYJxIZzR33BQTqizbh8eoSdSSSwUBzzOv_zqq2vFWUFrBmapmP61Qp0pmBUEKH8yUq8x1Go_YQsGjag8mTHMDoA43LYkNXHrIZCi5C8z_LVRhqJGeR_eH4b7RpGKvH_FysPhV1hd3e0gmZYNYbpABlnYbLYWfAT0H12XdWRD7CTc8c54XZzgT7bNOsY2O0QCh2oI8E8P3GUC1bTefbMRlTFAQFD59aTWGQOP7xgVL0am3yv8'
        },
        tasks: {
            completed: 0,
            total: 4,
            status: 'in-progress'
        },
        dueDate: 'Tomorrow',
        isOverdue: true
    },
    {
        id: '4',
        name: 'David Kim',
        email: 'd.kim@example.com',
        avatar: '',
        initials: 'DK',
        initialsColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
        role: 'Data Analyst',
        roleIcon: 'analytics',
        stage: {
            name: 'First Day',
            current: 100,
            total: 100,
            color: 'emerald',
            subText: 'Ready'
        },
        assignedTo: {
            name: 'HR Manager',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUog3FFs9wLHwhNjAmdK4IBgdlRzx8XnKaw79aTw0XHRCZuRc8gvLoWCBJ-G84maJAf42jR5ttZBIraP6LgUv7JWFiygffjnZZZ_6kEOa_QoEevhiOioRaTOn0ypysgD-QvhXD4pOXKMNmyssaKdALrHoqp6rDxClCuEGR3U99sjthASN7sQBSmcp-I4OO19rhP_yLj-DGT1twuqnR5E1pB9xzysOxlAMU8yTeTqgVyFMb-imkI8lWSAFdPckkV2oeO2JF_--R_mo'
        },
        tasks: {
            completed: 4,
            total: 4,
            status: 'done'
        },
        dueDate: 'Nov 01, 2023'
    },
    {
        id: '5',
        name: 'Anna Lee',
        email: 'anna.lee@example.com',
        avatar: '',
        initials: 'AL',
        initialsColor: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
        role: 'Customer Support',
        roleIcon: 'support_agent',
        stage: {
            name: 'Doc Collection',
            current: 20,
            total: 100,
            color: 'primary',
            subText: '1/5 Docs'
        },
        assignedTo: {
            name: 'John Doe',
            initials: 'JD'
        },
        tasks: {
            completed: 1,
            total: 5,
            status: 'blocked'
        },
        dueDate: 'Oct 28, 2023'
    }
];