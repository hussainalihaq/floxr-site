import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import AttendanceHeader from '@/components/attendance/AttendanceHeader'
import AttendanceContent from '@/components/attendance/AttendanceContent'

export default async function AttendancePage() {
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

    // Get today's timesheets
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const todayTimesheets = await prisma.timesheet.findMany({
        where: {
            employee: {
                companyId: user.companyId,
            },
            clockIn: {
                gte: today,
                lt: tomorrow,
            },
        },
        include: {
            employee: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },
        },
        orderBy: { clockIn: 'desc' },
    })

    // Serialize for client
    const serializedTimesheets = todayTimesheets.map(t => ({
        ...t,
        hoursWorked: t.hoursWorked ? Number(t.hoursWorked) : null,
        clockIn: t.clockIn.toISOString(),
        clockOut: t.clockOut?.toISOString() || null,
        createdAt: t.createdAt.toISOString(),
        updatedAt: t.updatedAt.toISOString(),
    }))

    // Get stats
    const clockedInCount = todayTimesheets.filter(t => !t.clockOut).length
    const totalHoursToday = todayTimesheets
        .filter(t => t.clockOut)
        .reduce((sum, t) => sum + (t.hoursWorked ? Number(t.hoursWorked) : 0), 0)

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <AttendanceHeader />
            <AttendanceContent
                employees={employees}
                initialTimesheets={serializedTimesheets}
                stats={{
                    clockedInCount,
                    totalHoursToday: Math.round(totalHoursToday * 100) / 100,
                    totalEmployees: employees.length,
                }}
            />
        </div>
    )
}

