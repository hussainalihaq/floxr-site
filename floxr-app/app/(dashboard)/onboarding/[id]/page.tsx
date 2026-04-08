import { getCurrentUser } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { OnboardingDetailContent } from '@/components/onboarding/OnboardingDetailContent'
import { OnboardingCandidate, DocumentItem, TimelineEvent } from '@/components/onboarding/detail-types'

interface Props {
    params: Promise<{ id: string }>
}

export default async function OnboardingDetailPage({ params }: Props) {
    const { id } = await params
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch employee data
    const employee = await prisma.employee.findUnique({
        where: { id },
        include: {
            department: true,
        },
    })

    if (!employee) {
        notFound()
    }

    // Transform employee to candidate format
    const progress = employee.onboardingProgress || 0;
    const startDate = new Date(employee.startDate);

    const candidate: OnboardingCandidate = {
        id: employee.id,
        name: `${employee.firstName} ${employee.lastName}`,
        role: employee.jobTitle || 'New Hire',
        department: employee.department?.name || 'Unassigned',
        startDate: startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        recruiter: 'HR Manager',
        location: 'Remote',
        progress,
        email: employee.email,
        initials: `${employee.firstName.charAt(0)}${employee.lastName.charAt(0)}`,
    };

    // Generate documents based on progress
    const documents: DocumentItem[] = [
        {
            id: 'offer',
            title: 'Offer Letter Signed',
            status: progress >= 10 ? 'completed' : 'pending',
            completedDate: progress >= 10 ? 'Recently' : undefined
        },
        {
            id: 'i9',
            title: 'I-9 Verification',
            status: progress >= 25 ? 'completed' : (progress >= 10 ? 'action_required' : 'pending'),
            completedDate: progress >= 25 ? 'Recently' : undefined
        },
        {
            id: 'bg-check',
            title: 'Background Check',
            status: progress >= 40 ? 'completed' : 'pending',
            completedDate: progress >= 40 ? 'Recently' : undefined
        },
        {
            id: 'tax',
            title: 'Tax Forms (W-4)',
            status: progress >= 55 ? 'completed' : (progress >= 40 ? 'action_required' : 'pending'),
            completedDate: progress >= 55 ? 'Recently' : undefined
        },
        {
            id: 'bank',
            title: 'Direct Deposit Info',
            status: progress >= 70 ? 'completed' : 'pending',
            completedDate: progress >= 70 ? 'Recently' : undefined
        },
    ];

    // Generate timeline based on progress
    const timelineEvents: TimelineEvent[] = [
        {
            id: 'email-sent',
            date: 'Start Date -14',
            title: 'Welcome Email Sent',
            description: 'System automatically sent the welcome package, handbook, and initial login credentials to personal email.',
            status: progress >= 5 ? 'completed' : (progress >= 0 ? 'in-progress' : 'pending'),
            statusLabel: progress >= 5 ? 'Completed' : (progress >= 0 ? 'Sending' : 'Pending'),
            icon: 'email',
            meta: {
                triggeredBy: 'HR System',
            }
        },
        {
            id: 'account-access',
            date: 'Start Date -10',
            title: 'Account Access Provisioned',
            description: 'SSO identity created. Access granted for Google Workspace, Slack, Jira, and company tools.',
            status: progress >= 30 ? 'completed' : (progress >= 20 ? 'in-progress' : 'pending'),
            statusLabel: progress >= 30 ? 'Provisioned' : (progress >= 20 ? 'Setting Up' : 'Pending'),
            icon: 'badge',
        },
        {
            id: 'shipping',
            time: progress >= 50 ? 'Completed' : (progress >= 35 ? 'In Progress' : 'Pending'),
            title: 'Equipment Shipping',
            description: 'Work equipment including laptop and accessories have been prepared for shipping.',
            status: progress >= 50 ? 'completed' : (progress >= 35 ? 'in-progress' : 'pending'),
            statusLabel: progress >= 50 ? 'Delivered' : (progress >= 35 ? 'Shipped' : 'Pending'),
            icon: 'shipping',
            meta: progress >= 35 ? {
                trackingNumber: '1Z999AA10123456784',
                triggeredBy: 'IT Logistics'
            } : undefined
        },
        {
            id: 'intro',
            time: progress >= 80 ? 'Completed' : 'Pending',
            title: 'Team Introduction',
            description: 'Scheduled virtual meet and greet with the team and key stakeholders.',
            status: progress >= 80 ? 'completed' : (progress >= 60 ? 'in-progress' : 'pending'),
            statusLabel: progress >= 80 ? 'Done' : 'Scheduled',
            icon: 'group',
            meta: {
                eventDate: `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, 10:00 AM`
            }
        },
        {
            id: 'training',
            title: 'Day 1 Training',
            description: 'Security awareness, company policies, and onboarding courses will unlock on start date.',
            status: progress >= 100 ? 'completed' : (progress >= 90 ? 'in-progress' : 'locked'),
            statusLabel: progress >= 100 ? 'Completed' : 'Locked',
            icon: 'training',
        },
    ];

    return (
        <OnboardingDetailContent
            candidate={candidate}
            documents={documents}
            timelineEvents={timelineEvents}
        />
    );
}
