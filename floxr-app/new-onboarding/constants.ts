import { Candidate, StatCardProps } from './types';

export const CANDIDATES: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChQc1kFAF7zvaD2cyN0Z5swZjUUcrUYJxIZzR33BQTqizbh8eoSdSSSwUBzzOv_zqq2vFWUFrBmapmP61Qp0pmBUEKH8yUq8x1Go_YQsGjag8mTHMDoA43LYkNXHrIZCi5C8z_LVRhqJGeR_eH4b7RpGKvH_FysPhV1hd3e0gmZYNYbpABlnYbLYWfAT0H12XdWRD7CTc8c54XZzgT7bNOsY2O0QCh2oI8E8P3GUC1bTefbMRlTFAQFD59aTWGQOP7xgVL0am3yv8',
    role: 'Product Designer',
    roleIcon: 'design_services',
    stageName: 'Doc Collection',
    stageProgress: 80,
    stageColor: 'primary',
    stageDetail: '4/5 Docs',
    assignedTo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUog3FFs9wLHwhNjAmdK4IBgdlRzx8XnKaw79aTw0XHRCZuRc8gvLoWCBJ-G84maJAf42jR5ttZBIraP6LgUv7JWFiygffjnZZZ_6kEOa_QoEevhiOioRaTOn0ypysgD-QvhXD4pOXKMNmyssaKdALrHoqp6rDxClCuEGR3U99sjthASN7sQBSmcp-I4OO19rhP_yLj-DGT1twuqnR5E1pB9xzysOxlAMU8yTeTqgVyFMb-imkI8lWSAFdPckkV2oeO2JF_--R_mo',
    tasksCompleted: 8,
    totalTasks: 10,
    taskStatus: 'checked',
    dueDate: 'Oct 24, 2023'
  },
  {
    id: '2',
    name: 'Mike Ross',
    email: 'mike.ross@example.com',
    avatar: '', // Initials MR
    role: 'Frontend Dev',
    roleIcon: 'code',
    stageName: 'Offer Sent',
    stageProgress: 100,
    stageColor: 'purple',
    stageDetail: 'Awaiting Sig',
    assignedTo: 'JD', // Initials
    tasksCompleted: 1,
    totalTasks: 3,
    taskStatus: 'pending',
    dueDate: 'Oct 26, 2023'
  },
  {
    id: '3',
    name: 'Emily Chen',
    email: 'emily.c@example.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUog3FFs9wLHwhNjAmdK4IBgdlRzx8XnKaw79aTw0XHRCZuRc8gvLoWCBJ-G84maJAf42jR5ttZBIraP6LgUv7JWFiygffjnZZZ_6kEOa_QoEevhiOioRaTOn0ypysgD-QvhXD4pOXKMNmyssaKdALrHoqp6rDxClCuEGR3U99sjthASN7sQBSmcp-I4OO19rhP_yLj-DGT1twuqnR5E1pB9xzysOxlAMU8yTeTqgVyFMb-imkI8lWSAFdPckkV2oeO2JF_--R_mo',
    role: 'Marketing Lead',
    roleIcon: 'campaign',
    stageName: 'IT Provisioning',
    stageProgress: 20,
    stageColor: 'orange',
    stageDetail: 'Setup',
    assignedTo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChQc1kFAF7zvaD2cyN0Z5swZjUUcrUYJxIZzR33BQTqizbh8eoSdSSSwUBzzOv_zqq2vFWUFrBmapmP61Qp0pmBUEKH8yUq8x1Go_YQsGjag8mTHMDoA43LYkNXHrIZCi5C8z_LVRhqJGeR_eH4b7RpGKvH_FysPhV1hd3e0gmZYNYbpABlnYbLYWfAT0H12XdWRD7CTc8c54XZzgT7bNOsY2O0QCh2oI8E8P3GUC1bTefbMRlTFAQFD59aTWGQOP7xgVL0am3yv8',
    tasksCompleted: 0,
    totalTasks: 4,
    taskStatus: 'blocked',
    dueDate: 'Tomorrow',
    isDueDateUrgent: true
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'd.kim@example.com',
    avatar: '', // Initials DK
    role: 'Data Analyst',
    roleIcon: 'analytics',
    stageName: 'First Day',
    stageProgress: 100,
    stageColor: 'emerald',
    stageDetail: 'Ready',
    assignedTo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUog3FFs9wLHwhNjAmdK4IBgdlRzx8XnKaw79aTw0XHRCZuRc8gvLoWCBJ-G84maJAf42jR5ttZBIraP6LgUv7JWFiygffjnZZZ_6kEOa_QoEevhiOioRaTOn0ypysgD-QvhXD4pOXKMNmyssaKdALrHoqp6rDxClCuEGR3U99sjthASN7sQBSmcp-I4OO19rhP_yLj-DGT1twuqnR5E1pB9xzysOxlAMU8yTeTqgVyFMb-imkI8lWSAFdPckkV2oeO2JF_--R_mo',
    tasksCompleted: 5,
    totalTasks: 5,
    taskStatus: 'done',
    dueDate: 'Nov 01, 2023'
  },
  {
    id: '5',
    name: 'Anna Lee',
    email: 'anna.lee@example.com',
    avatar: '', // Initials AL
    role: 'Customer Support',
    roleIcon: 'support_agent',
    stageName: 'Doc Collection',
    stageProgress: 20,
    stageColor: 'primary',
    stageDetail: '1/5 Docs',
    assignedTo: 'JD',
    tasksCompleted: 0,
    totalTasks: 4,
    taskStatus: 'blocked',
    dueDate: 'Oct 28, 2023'
  }
];

export const STATS: StatCardProps[] = [
  {
    step: 1,
    title: 'Offer Sent',
    count: 12,
    subtitle: 'candidates',
    color: 'purple',
    progress: 40,
    icon: 'send'
  },
  {
    step: 2,
    title: 'Doc Collection',
    count: 8,
    subtitle: 'candidates',
    color: 'primary',
    progress: 65,
    icon: 'description'
  },
  {
    step: 3,
    title: 'IT Provisioning',
    count: 5,
    subtitle: 'candidates',
    color: 'orange',
    progress: 25,
    icon: 'devices'
  },
  {
    step: 4,
    title: 'First Day',
    count: 3,
    subtitle: 'starting soon',
    color: 'emerald',
    progress: 80,
    icon: 'celebration'
  }
];
