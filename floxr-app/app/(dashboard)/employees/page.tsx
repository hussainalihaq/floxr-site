import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import EmployeesClient from '@/components/employees/EmployeesClient'
import { EmployeeData } from '@/components/employees/types'

export default async function EmployeesPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    const employees = await prisma.employee.findMany({
        where: { companyId: user.companyId },
        include: { department: true },
        orderBy: { createdAt: 'desc' },
        take: 100,
    })

    // Transform to match EmployeeData interface
    const employeeData: EmployeeData[] = employees.map((e) => ({
        id: e.id,
        firstName: e.firstName,
        lastName: e.lastName,
        email: e.email,
        jobTitle: e.jobTitle,
        department: e.department ? { id: e.department.id, name: e.department.name } : null,
        status: e.status,
        onboardingProgress: e.onboardingProgress || 0,
        avatar: undefined,
    }))

    return <EmployeesClient initialEmployees={employeeData} />
}
