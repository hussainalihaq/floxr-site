import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// GET /api/employees/:id - Get employee details
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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
            return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
        }

        return NextResponse.json({ employee })
    } catch (error) {
        console.error('Error fetching employee:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// PUT /api/employees/:id - Update employee
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Check if employee belongs to company
        const existing = await prisma.employee.findFirst({
            where: {
                id: id,
                companyId: user.companyId,
            },
        })

        if (!existing) {
            return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
        }

        const body = await request.json()

        // Build update data dynamically
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updateData: any = {}

        const fields = [
            'firstName', 'lastName', 'email', 'phone', 'whatsappNumber',
            'personalEmail', 'jobTitle', 'departmentId', 'employmentType',
            'status', 'onboardingStatus', 'onboardingProgress',
            'currency', 'taxId', 'taxIdType'
        ]

        for (const field of fields) {
            if (body[field] !== undefined) {
                updateData[field] = body[field]
            }
        }

        // Handle dates separately
        if (body.startDate) updateData.startDate = new Date(body.startDate)
        if (body.endDate) updateData.endDate = new Date(body.endDate)

        // Handle salary
        if (body.salary !== undefined) {
            updateData.salary = body.salary ? parseFloat(body.salary) : null
        }

        const employee = await prisma.employee.update({
            where: { id: id },
            data: updateData,
            include: {
                department: true,
            },
        })

        // Log activity
        try {
            await prisma.activityLog.create({
                data: {
                    action: 'EMPLOYEE_UPDATED',
                    metadata: {
                        employeeId: employee.id,
                        employeeName: `${employee.firstName} ${employee.lastName}`,
                    },
                    userId: user.id,
                },
            })
        } catch {
            // Activity log is optional
        }

        return NextResponse.json({ employee })
    } catch (error) {
        console.error('Error updating employee:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// DELETE /api/employees/:id - Soft delete (set status to TERMINATED)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Check if employee belongs to company
        const existing = await prisma.employee.findFirst({
            where: {
                id: id,
                companyId: user.companyId,
            },
        })

        if (!existing) {
            return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
        }

        // Soft delete - set status to TERMINATED
        const employee = await prisma.employee.update({
            where: { id: id },
            data: {
                status: 'TERMINATED',
                endDate: new Date(),
            },
        })

        // Log activity
        try {
            await prisma.activityLog.create({
                data: {
                    action: 'EMPLOYEE_TERMINATED',
                    metadata: {
                        employeeId: employee.id,
                        employeeName: `${employee.firstName} ${employee.lastName}`,
                    },
                    userId: user.id,
                },
            })
        } catch {
            // Activity log is optional
        }

        return NextResponse.json({ message: 'Employee terminated successfully' })
    } catch (error) {
        console.error('Error deleting employee:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
