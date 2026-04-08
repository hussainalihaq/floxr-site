import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { EmployeeProfileClient } from '@/components/employees/profile/EmployeeProfileClient'

export default async function EmployeeDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    const employee = await prisma.employee.findFirst({
        where: {
            id: id,
            companyId: user.companyId,
        },
        include: {
            department: true,
        },
    })

    if (!employee) {
        redirect('/employees')
    }

    // Serialize for client component
    const serializedEmployee = {
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        jobTitle: employee.jobTitle,
        department: employee.department ? { name: employee.department.name } : null,
        status: employee.status,
        employmentType: employee.employmentType,
        startDate: employee.startDate.toISOString(),
        onboardingProgress: employee.onboardingProgress || 0,
        onboardingStatus: employee.onboardingStatus,
        avatar: null, // Can add avatar support later
    }

    return <EmployeeProfileClient employee={serializedEmployee} />
}
