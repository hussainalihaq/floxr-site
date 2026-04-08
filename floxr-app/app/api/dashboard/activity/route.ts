import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const companyId = searchParams.get('companyId');

        if (!companyId) {
            return NextResponse.json({ error: 'Company ID required' }, { status: 400 });
        }

        // Fetch recent activity logs
        const activities = await prisma.activityLog.findMany({
            where: {
                user: {
                    companyId
                }
            },
            include: {
                user: {
                    select: {
                        name: true,
                        avatar: true,
                        email: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 5
        });

        // Map actions to friendly descriptions
        const formattedActivities = activities.map(activity => {
            const timeAgo = getTimeAgo(activity.createdAt);
            const metadata = activity.metadata as any;

            let title = activity.user.name;
            let description = '';
            let type = 'update';
            let icon = 'update';

            // Format description based on action type
            switch (activity.action) {
                case 'EMPLOYEE_ADDED':
                    description = `Added new employee ${metadata?.employeeName || 'to the team'}`;
                    type = 'update';
                    icon = 'person_add';
                    break;
                case 'EMPLOYEE_OFFBOARDED':
                    description = `Offboarded employee ${metadata?.employeeName || ''}`;
                    type = 'alert';
                    icon = 'warning';
                    break;
                case 'PAYROLL_PROCESSED':
                    description = `Processed payroll for ${metadata?.period || 'current period'}`;
                    type = 'update';
                    icon = 'payments';
                    break;
                case 'INTEGRATION_CONNECTED':
                    description = `Connected integration for ${metadata?.serviceName || 'a service'}`;
                    type = 'update';
                    icon = 'link';
                    break;
                case 'DOCUMENT_VERIFIED':
                    description = `Verified document for ${metadata?.employeeName || 'employee'}`;
                    type = 'update';
                    icon = 'check_circle';
                    break;
                case 'LEAVE_APPROVED':
                    description = `Approved leave request for ${metadata?.employeeName || 'employee'}`;
                    type = 'notification';
                    icon = 'event';
                    break;
                case 'LEAVE_DENIED':
                    description = `Denied leave request for ${metadata?.employeeName || 'employee'}`;
                    type = 'alert';
                    icon = 'event_busy';
                    break;
                case 'USER_LOGGED_IN':
                    description = 'Logged into the system';
                    type = 'update';
                    icon = 'login';
                    break;
                default:
                    description = activity.action.toLowerCase().replace(/_/g, ' ');
                    type = 'update';
                    icon = 'info';
            }

            return {
                id: activity.id,
                type,
                icon,
                user: {
                    name: activity.user.name,
                    avatar: activity.user.avatar
                },
                title,
                description,
                time: timeAgo,
                isOnline: isRecentlyActive(activity.createdAt)
            };
        });

        return NextResponse.json({
            activities: formattedActivities
        });

    } catch (error) {
        console.error('Error fetching activity data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch activity data' },
            { status: 500 }
        );
    }
}

// Helper function to calculate time ago
function getTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    return new Date(date).toLocaleDateString();
}

// Helper function to determine if user is recently active (within 10 minutes)
function isRecentlyActive(date: Date): boolean {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    return diffMs < 600000; // 10 minutes in milliseconds
}
