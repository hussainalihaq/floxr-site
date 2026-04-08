import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const companyId = searchParams.get('companyId');

        if (!companyId) {
            return NextResponse.json({ error: 'Company ID required' }, { status: 400 });
        }

        // Get employees currently in onboarding
        const onboardingEmployees = await prisma.employee.findMany({
            where: {
                companyId,
                onboardingStatus: 'IN_PROGRESS'
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                onboardingProgress: true,
                jobTitle: true
            },
            orderBy: {
                startDate: 'desc'
            },
            take: 5 // Show up to 5 recent onboarding candidates
        });

        // Map progress to workflow steps
        const workflowData = onboardingEmployees.map(employee => {
            const { onboardingProgress } = employee;

            // Determine current step based on progress
            let currentStep = 1;
            let stepLabel = 'Offer Accepted';
            let subLabel = 'Candidate Signed';

            if (onboardingProgress >= 75) {
                currentStep = 4;
                stepLabel = 'Welcome Day';
                subLabel = 'Team Intro';
            } else if (onboardingProgress >= 50) {
                currentStep = 3;
                stepLabel = 'IT Provisioning';
                subLabel = 'Hardware Setup';
            } else if (onboardingProgress >= 25) {
                currentStep = 2;
                stepLabel = 'Doc Collection';
                subLabel = 'I-9 & Tax Forms';
            }

            return {
                id: employee.id,
                name: `${employee.firstName} ${employee.lastName}`,
                jobTitle: employee.jobTitle || 'New Hire',
                progress: onboardingProgress,
                currentStep,
                stepLabel,
                subLabel,
                steps: [
                    {
                        id: '1',
                        label: 'Offer Accepted',
                        subLabel: 'Candidate Signed',
                        status: onboardingProgress >= 25 ? 'completed' : 'in-progress',
                        icon: 'check_circle'
                    },
                    {
                        id: '2',
                        label: 'Doc Collection',
                        subLabel: 'I-9 & Tax Forms',
                        status: onboardingProgress >= 50
                            ? 'completed'
                            : onboardingProgress >= 25
                                ? 'in-progress'
                                : 'pending',
                        icon: 'sync'
                    },
                    {
                        id: '3',
                        label: 'IT Provisioning',
                        subLabel: 'Hardware Setup',
                        status: onboardingProgress >= 75
                            ? 'completed'
                            : onboardingProgress >= 50
                                ? 'in-progress'
                                : 'pending',
                        icon: 'laptop_mac'
                    },
                    {
                        id: '4',
                        label: 'Welcome Day',
                        subLabel: 'Team Intro',
                        status: onboardingProgress === 100
                            ? 'completed'
                            : onboardingProgress >= 75
                                ? 'in-progress'
                                : 'locked',
                        icon: 'lock'
                    }
                ]
            };
        });

        return NextResponse.json({
            workflows: workflowData,
            hasActiveOnboarding: workflowData.length > 0
        });

    } catch (error) {
        console.error('Error fetching workflow data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch workflow data' },
            { status: 500 }
        );
    }
}
