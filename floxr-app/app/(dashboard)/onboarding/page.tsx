import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { OnboardingContent } from '@/components/onboarding/OnboardingContent'
import { Candidate } from '@/components/onboarding/types'

export default async function OnboardingPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch employees with ONBOARDING status
    const employees = await prisma.employee.findMany({
        where: {
            companyId: user.companyId,
            status: 'ONBOARDING',
        },
        include: {
            department: true,
        },
        orderBy: {
            startDate: 'asc',
        },
    })

    // Transform employees to candidates format
    const candidates: Candidate[] = employees.map((employee, index) => {
        const progress = employee.onboardingProgress || 0;

        // Determine stage based on progress
        let stage: Candidate['stage'];
        if (progress < 25) {
            stage = {
                name: 'Offer Sent',
                current: progress,
                total: 25,
                color: 'purple',
                subText: 'Awaiting Sig'
            };
        } else if (progress < 50) {
            stage = {
                name: 'Doc Collection',
                current: progress - 25,
                total: 25,
                color: 'primary',
                subText: `${Math.floor((progress - 25) / 5)}/5 Docs`
            };
        } else if (progress < 75) {
            stage = {
                name: 'IT Provisioning',
                current: progress - 50,
                total: 25,
                color: 'orange',
                subText: 'Setup'
            };
        } else {
            stage = {
                name: 'First Day',
                current: progress - 75,
                total: 25,
                color: 'emerald',
                subText: 'Ready'
            };
        }

        // Determine task status
        const tasksCompleted = Math.floor(progress / 25);
        let taskStatus: 'blocked' | 'done' | 'pending' | 'in-progress' = 'in-progress';
        if (progress >= 100) taskStatus = 'done';
        else if (progress === 0) taskStatus = 'pending';

        // Role icon mapping
        const roleIcons: Record<string, string> = {
            'designer': 'design_services',
            'developer': 'code',
            'marketing': 'campaign',
            'analyst': 'analytics',
            'support': 'support_agent',
        };
        const jobLower = (employee.jobTitle || '').toLowerCase();
        let roleIcon = 'code';
        Object.keys(roleIcons).forEach(key => {
            if (jobLower.includes(key)) roleIcon = roleIcons[key];
        });

        // Calculate due date
        const startDate = new Date(employee.startDate);
        const today = new Date();
        const daysUntilStart = Math.ceil((startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        let dueDate = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        let isOverdue = false;
        if (daysUntilStart <= 0) {
            dueDate = 'Today';
        } else if (daysUntilStart === 1) {
            dueDate = 'Tomorrow';
            isOverdue = progress < 75;
        } else if (daysUntilStart < 0) {
            isOverdue = progress < 100;
        }

        return {
            id: employee.id,
            name: `${employee.firstName} ${employee.lastName}`,
            email: employee.email,
            avatar: undefined,
            initials: `${employee.firstName.charAt(0)}${employee.lastName.charAt(0)}`,
            role: employee.jobTitle || 'New Hire',
            roleIcon,
            stage,
            assignedTo: {
                name: 'HR Manager',
                initials: 'HR'
            },
            tasks: {
                completed: tasksCompleted,
                total: 4,
                status: taskStatus
            },
            dueDate,
            isOverdue
        };
    });

    // If no real candidates, add mock data for demo
    const displayCandidates = candidates.length > 0 ? candidates : getMockCandidates();

    return <OnboardingContent candidates={displayCandidates} />
}

// Mock candidates for demo when no real data
function getMockCandidates(): Candidate[] {
    return [
        {
            id: 'mock-1',
            name: 'Sarah Jenkins',
            email: 'sarah.j@example.com',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
            role: 'Product Designer',
            roleIcon: 'design_services',
            stage: {
                name: 'Doc Collection',
                current: 80,
                total: 100,
                color: 'primary',
                subText: '4/5 Docs'
            },
            assignedTo: {
                name: 'HR Manager',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
            },
            tasks: {
                completed: 8,
                total: 10,
                status: 'in-progress'
            },
            dueDate: 'Feb 15, 2026'
        },
        {
            id: 'mock-2',
            name: 'Mike Ross',
            email: 'mike.ross@example.com',
            initials: 'MR',
            initialsColor: 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white',
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
            dueDate: 'Feb 20, 2026'
        },
        {
            id: 'mock-3',
            name: 'Emily Chen',
            email: 'emily.c@example.com',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
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
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
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
            id: 'mock-4',
            name: 'David Kim',
            email: 'd.kim@example.com',
            initials: 'DK',
            initialsColor: 'bg-blue-500/20 text-blue-400',
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
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
            },
            tasks: {
                completed: 4,
                total: 4,
                status: 'done'
            },
            dueDate: 'Feb 25, 2026'
        },
        {
            id: 'mock-5',
            name: 'Anna Lee',
            email: 'anna.lee@example.com',
            initials: 'AL',
            initialsColor: 'bg-teal-500/20 text-teal-400',
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
            dueDate: 'Feb 18, 2026'
        }
    ];
}
