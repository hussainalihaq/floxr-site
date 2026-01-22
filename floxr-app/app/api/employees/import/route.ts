import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// POST /api/employees/import - Bulk CSV import
export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { employees } = await request.json()

        if (!employees || !Array.isArray(employees) || employees.length === 0) {
            return NextResponse.json(
                { error: 'Please provide an array of employees' },
                { status: 400 }
            )
        }

        const results = {
            success: 0,
            failed: 0,
            errors: [] as Array<{ row: number; email: string; error: string }>,
        }

        for (let i = 0; i < employees.length; i++) {
            const emp = employees[i]

            try {
                // Validate required fields
                if (!emp.firstName || !emp.lastName || !emp.email || !emp.startDate) {
                    results.failed++
                    results.errors.push({
                        row: i + 1,
                        email: emp.email || 'Unknown',
                        error: 'Missing required fields (firstName, lastName, email, startDate)',
                    })
                    continue
                }

                // Check for duplicate
                const existing = await prisma.employee.findUnique({
                    where: { email: emp.email },
                })

                if (existing) {
                    results.failed++
                    results.errors.push({
                        row: i + 1,
                        email: emp.email,
                        error: 'Employee with this email already exists',
                    })
                    continue
                }

                // Find or create department if provided
                let departmentId = null
                if (emp.department) {
                    const existingDept = await prisma.department.findFirst({
                        where: {
                            name: { equals: emp.department, mode: 'insensitive' },
                            companyId: user.companyId,
                        },
                    })

                    if (existingDept) {
                        departmentId = existingDept.id
                    } else {
                        const newDept = await prisma.department.create({
                            data: {
                                name: emp.department,
                                companyId: user.companyId,
                            },
                        })
                        departmentId = newDept.id
                    }
                }

                // Create employee with flexible data object
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const employeeData: any = {
                    firstName: emp.firstName,
                    lastName: emp.lastName,
                    email: emp.email,
                    phone: emp.phone || null,
                    departmentId,
                    employmentType: emp.employmentType || 'FULL_TIME',
                    startDate: new Date(emp.startDate),
                    status: 'ONBOARDING',
                    companyId: user.companyId,
                }

                // Add optional fields only if they have values
                if (emp.jobTitle) employeeData.jobTitle = emp.jobTitle
                if (emp.salary) employeeData.salary = parseFloat(emp.salary)

                await prisma.employee.create({ data: employeeData })
                results.success++
            } catch (error: unknown) {
                results.failed++
                const errorMessage = error instanceof Error ? error.message : 'Unknown error'
                results.errors.push({
                    row: i + 1,
                    email: emp.email || 'Unknown',
                    error: errorMessage,
                })
            }
        }

        // Log activity
        try {
            await prisma.activityLog.create({
                data: {
                    action: 'EMPLOYEES_IMPORTED',
                    metadata: {
                        total: employees.length,
                        success: results.success,
                        failed: results.failed,
                    },
                    userId: user.id,
                },
            })
        } catch {
            // Activity log is optional
        }

        return NextResponse.json({
            message: `Imported ${results.success} employees successfully`,
            ...results,
        })
    } catch (error) {
        console.error('Error importing employees:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
