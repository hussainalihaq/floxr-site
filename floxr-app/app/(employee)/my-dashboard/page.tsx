import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import MyDashboardClient from './MyDashboardClient'

export default async function MyDashboardPage() {
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
        select: {
            id: true,
            firstName: true,
            lastName: true,
        }
    })

    if (!employee) {
        redirect('/dashboard')
    }

    // Get today's timesheet
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const todayTimesheet = await prisma.timesheet.findFirst({
        where: {
            employeeId: employee.id,
            clockIn: {
                gte: today,
                lt: tomorrow,
            }
        },
        orderBy: { clockIn: 'desc' }
    })

    // Get leave balance (simple count of approved leaves this year)
    const yearStart = new Date(today.getFullYear(), 0, 1)
    const leavesTaken = await prisma.leaveRequest.count({
        where: {
            employeeId: employee.id,
            status: 'APPROVED',
            startDate: { gte: yearStart }
        }
    })

    // Get pending leave requests
    const pendingLeaves = await prisma.leaveRequest.count({
        where: {
            employeeId: employee.id,
            status: 'PENDING'
        }
    })

    // Get recent payroll
    const lastPayroll = await prisma.payroll.findFirst({
        where: {
            employeeId: employee.id,
            status: 'PAID'
        },
        orderBy: { paidAt: 'desc' }
    })

    // Serialize
    const serializedTimesheet = todayTimesheet ? {
        ...todayTimesheet,
        hoursWorked: todayTimesheet.hoursWorked ? Number(todayTimesheet.hoursWorked) : null,
        clockIn: todayTimesheet.clockIn.toISOString(),
        clockOut: todayTimesheet.clockOut?.toISOString() || null,
    } : null

    const serializedPayroll = lastPayroll ? {
        id: lastPayroll.id,
        netPay: Number(lastPayroll.netPay),
        paidAt: lastPayroll.paidAt?.toISOString() || null,
    } : null

    return (
        <MyDashboardClient
            employeeId={employee.id}
            employeeName={`${employee.firstName} ${employee.lastName}`}
            todayTimesheet={serializedTimesheet}
            stats={{
                leaveBalance: 20 - leavesTaken, // Assume 20 days annual
                pendingLeaves,
                lastPayroll: serializedPayroll,
            }}
        />
    )
}
