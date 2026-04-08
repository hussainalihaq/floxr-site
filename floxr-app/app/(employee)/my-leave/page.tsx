import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import MyLeaveClient from './MyLeaveClient'

export default async function MyLeavePage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    // Get employee record
    const employee = await prisma.employee.findFirst({
        where: {
            email: user.email,
            companyId: user.companyId,
        },
        select: { id: true, firstName: true, lastName: true }
    })

    if (!employee) {
        redirect('/dashboard')
    }

    // Get leave requests
    const leaveRequests = await prisma.leaveRequest.findMany({
        where: { employeeId: employee.id },
        orderBy: { createdAt: 'desc' },
        take: 50
    })

    // Serialize dates
    const serializedRequests = leaveRequests.map(lr => ({
        ...lr,
        startDate: lr.startDate.toISOString(),
        endDate: lr.endDate.toISOString(),
        createdAt: lr.createdAt.toISOString(),
        updatedAt: lr.updatedAt.toISOString(),
    }))

    // Calculate leave balance
    const yearStart = new Date()
    yearStart.setMonth(0, 1)
    yearStart.setHours(0, 0, 0, 0)

    const approvedLeaves = leaveRequests.filter(
        lr => lr.status === 'APPROVED' && lr.startDate >= yearStart
    ).length

    return (
        <MyLeaveClient
            employeeId={employee.id}
            leaveRequests={serializedRequests}
            leaveBalance={20 - approvedLeaves}
        />
    )
}
