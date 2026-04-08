import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import PayrollClient from './PayrollClient'

export default async function PayrollPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch employees, payroll data, and departments for user's company
    const [employees, payrolls, departments] = await Promise.all([
        prisma.employee.findMany({
            where: {
                companyId: user.companyId,
                status: { in: ['ACTIVE', 'ONBOARDING'] }
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                jobTitle: true,
                salary: true,
                hourlyRate: true,
                currency: true,
                employmentType: true,
                department: {
                    select: { name: true }
                }
            },
            orderBy: { firstName: 'asc' }
        }),
        prisma.payroll.findMany({
            where: {
                employee: {
                    companyId: user.companyId
                }
            },
            include: {
                employee: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        jobTitle: true,
                        currency: true,
                    }
                }
            },
            orderBy: { payPeriodStart: 'desc' },
            take: 100
        }),
        prisma.department.findMany({
            where: { companyId: user.companyId },
            select: { id: true, name: true },
            orderBy: { name: 'asc' }
        })
    ])

    // Serialize Decimal values
    const serializedEmployees = employees.map(emp => ({
        ...emp,
        salary: emp.salary ? Number(emp.salary) : null,
        hourlyRate: emp.hourlyRate ? Number(emp.hourlyRate) : null,
    }))

    const serializedPayrolls = payrolls.map(p => ({
        ...p,
        hoursWorked: p.hoursWorked ? Number(p.hoursWorked) : null,
        grossPay: Number(p.grossPay),
        deductions: Number(p.deductions),
        netPay: Number(p.netPay),
        payPeriodStart: p.payPeriodStart.toISOString(),
        payPeriodEnd: p.payPeriodEnd.toISOString(),
        paidAt: p.paidAt?.toISOString() || null,
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
    }))

    return (
        <PayrollClient
            employees={serializedEmployees}
            payrolls={serializedPayrolls}
            companyId={user.companyId}
            departments={departments}
        />
    )
}
