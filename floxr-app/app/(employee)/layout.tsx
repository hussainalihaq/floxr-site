import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import EmployeeSidebar from '@/components/employee/EmployeeSidebar'

export default async function EmployeeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    // Get the employee record linked to this user
    const employee = await prisma.employee.findFirst({
        where: {
            email: user.email,
            companyId: user.companyId,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            jobTitle: true,
            department: {
                select: { name: true }
            }
        }
    })

    if (!employee) {
        // User is not an employee, redirect to dashboard if admin
        redirect('/dashboard')
    }

    return (
        <div className="dashboard-layout">
            {/* Employee Sidebar */}
            <EmployeeSidebar
                employee={{
                    id: employee.id,
                    name: `${employee.firstName} ${employee.lastName}`,
                    email: employee.email,
                    jobTitle: employee.jobTitle,
                    department: employee.department?.name
                }}
            />

            {/* Main Content */}
            <main className="dashboard-main">
                {children}
            </main>
        </div>
    )
}
