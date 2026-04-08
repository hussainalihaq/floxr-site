import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import LeaveClient from './LeaveClient'

export default async function LeavePage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    // Get all employees for the company
    const employees = await prisma.employee.findMany({
        where: { companyId: user.companyId },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            department: {
                select: { name: true },
            },
        },
        orderBy: { firstName: 'asc' },
    })

    // Get leave requests
    const leaveRequests = await prisma.leaveRequest.findMany({
        where: {
            employee: {
                companyId: user.companyId,
            },
        },
        include: {
            employee: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    department: {
                        select: { name: true },
                    },
                },
            },
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
    })

    // Serialize dates for client
    const serializedRequests = leaveRequests.map(lr => ({
        ...lr,
        startDate: lr.startDate.toISOString(),
        endDate: lr.endDate.toISOString(),
        createdAt: lr.createdAt.toISOString(),
        updatedAt: lr.updatedAt.toISOString(),
    }))

    // Get stats
    const pendingCount = leaveRequests.filter(lr => lr.status === 'PENDING').length
    const approvedThisMonth = leaveRequests.filter(lr => {
        const isApproved = lr.status === 'APPROVED'
        const thisMonth = new Date().getMonth() === lr.createdAt.getMonth()
        return isApproved && thisMonth
    }).length

    // Check if user can approve (OWNER, ADMIN, MANAGER)
    const canApprove = ['OWNER', 'ADMIN', 'MANAGER'].includes(user.role)

    return (
        <LeaveClient
            employees={employees}
            leaveRequests={serializedRequests}
            stats={{
                pendingCount,
                approvedThisMonth,
                totalRequests: leaveRequests.length,
            }}
            canApprove={canApprove}
        />
    )
}
