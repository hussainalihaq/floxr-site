import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const companyId = searchParams.get('companyId');

        if (!companyId) {
            return NextResponse.json({ error: 'Company ID required' }, { status: 400 });
        }

        // Get today's date range
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Get current month range
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        // Parallel queries for all stats
        const [
            totalEmployees,
            todayAttendance,
            pendingLeaveRequests,
            pendingPayrolls,
            monthlyPayroll,
            activeOnboarding
        ] = await Promise.all([
            // Total active employees
            prisma.employee.count({
                where: {
                    companyId,
                    status: 'ACTIVE'
                }
            }),

            // Today's attendance (employees who clocked in today)
            prisma.timesheet.count({
                where: {
                    employee: { companyId },
                    clockIn: {
                        gte: today,
                        lt: tomorrow
                    }
                }
            }),

            // Pending leave requests
            prisma.leaveRequest.count({
                where: {
                    employee: { companyId },
                    status: 'PENDING'
                }
            }),

            // Pending payroll batches
            prisma.payroll.count({
                where: {
                    employee: { companyId },
                    status: 'PENDING'
                }
            }),

            // This month's payroll total
            prisma.payroll.aggregate({
                where: {
                    employee: { companyId },
                    status: { in: ['PROCESSED', 'PAID'] },
                    payPeriodStart: {
                        gte: startOfMonth,
                        lte: endOfMonth
                    }
                },
                _sum: {
                    netPay: true
                }
            }),

            // Employees in onboarding
            prisma.employee.count({
                where: {
                    companyId,
                    onboardingStatus: 'IN_PROGRESS'
                }
            })
        ]);

        // Calculate hours saved (rough estimate: 10 hours per employee onboarded)
        const hoursSaved = Math.round((totalEmployees - activeOnboarding) * 10);

        // Calculate pending approvals total
        const pendingApprovals = pendingLeaveRequests + pendingPayrolls;

        return NextResponse.json({
            hoursSaved,
            todayAttendance: {
                present: todayAttendance,
                total: totalEmployees,
                percentage: totalEmployees > 0 ? Math.round((todayAttendance / totalEmployees) * 100) : 0
            },
            pendingApprovals: {
                total: pendingApprovals,
                leaveRequests: pendingLeaveRequests,
                payrollBatches: pendingPayrolls
            },
            monthlyPayroll: {
                total: monthlyPayroll._sum.netPay || 0,
                status: 'Scheduled'
            }
        });

    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return NextResponse.json(
            { error: 'Failed to fetch dashboard statistics' },
            { status: 500 }
        );
    }
}
