import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Decimal } from '@prisma/client/runtime/library'

// Helper to serialize Decimal values
function serializePayroll(payroll: any) {
    return {
        ...payroll,
        hoursWorked: payroll.hoursWorked ? Number(payroll.hoursWorked) : null,
        grossPay: Number(payroll.grossPay),
        deductions: Number(payroll.deductions),
        netPay: Number(payroll.netPay),
        employee: payroll.employee ? {
            ...payroll.employee,
            salary: payroll.employee.salary ? Number(payroll.employee.salary) : null,
            hourlyRate: payroll.employee.hourlyRate ? Number(payroll.employee.hourlyRate) : null,
        } : undefined
    }
}

// GET /api/payroll/[id] - Get single payroll record
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const payroll = await prisma.payroll.findUnique({
            where: { id },
            include: {
                employee: {
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
                    }
                }
            }
        })

        if (!payroll) {
            return NextResponse.json(
                { error: 'Payroll record not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(serializePayroll(payroll))
    } catch (error) {
        console.error('Error fetching payroll:', error)
        return NextResponse.json(
            { error: 'Failed to fetch payroll record' },
            { status: 500 }
        )
    }
}

// PUT /api/payroll/[id] - Update payroll record
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()

        // Verify payroll exists
        const existingPayroll = await prisma.payroll.findUnique({
            where: { id }
        })

        if (!existingPayroll) {
            return NextResponse.json(
                { error: 'Payroll record not found' },
                { status: 404 }
            )
        }

        // Only allow updates to PENDING payroll
        if (existingPayroll.status === 'PAID') {
            return NextResponse.json(
                { error: 'Cannot modify paid payroll records' },
                { status: 400 }
            )
        }

        // Build update data
        const updateData: any = {}

        if (body.hoursWorked !== undefined) {
            updateData.hoursWorked = new Decimal(body.hoursWorked)
        }
        if (body.grossPay !== undefined) {
            updateData.grossPay = new Decimal(body.grossPay)
        }
        if (body.deductions !== undefined) {
            updateData.deductions = new Decimal(body.deductions)
        }
        if (body.netPay !== undefined) {
            updateData.netPay = new Decimal(body.netPay)
        } else if (body.grossPay !== undefined || body.deductions !== undefined) {
            // Recalculate net pay
            const gross = body.grossPay !== undefined ? body.grossPay : Number(existingPayroll.grossPay)
            const deduct = body.deductions !== undefined ? body.deductions : Number(existingPayroll.deductions)
            updateData.netPay = new Decimal(gross - deduct)
        }
        if (body.status) {
            updateData.status = body.status
        }

        const payroll = await prisma.payroll.update({
            where: { id },
            data: updateData,
            include: {
                employee: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        jobTitle: true,
                    }
                }
            }
        })

        return NextResponse.json(serializePayroll(payroll))
    } catch (error) {
        console.error('Error updating payroll:', error)
        return NextResponse.json(
            { error: 'Failed to update payroll record' },
            { status: 500 }
        )
    }
}

// DELETE /api/payroll/[id] - Delete payroll record
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        // Verify payroll exists
        const existingPayroll = await prisma.payroll.findUnique({
            where: { id }
        })

        if (!existingPayroll) {
            return NextResponse.json(
                { error: 'Payroll record not found' },
                { status: 404 }
            )
        }

        // Only allow deletion of PENDING payroll
        if (existingPayroll.status !== 'PENDING') {
            return NextResponse.json(
                { error: 'Can only delete pending payroll records' },
                { status: 400 }
            )
        }

        await prisma.payroll.delete({
            where: { id }
        })

        return NextResponse.json({ success: true, message: 'Payroll record deleted' })
    } catch (error) {
        console.error('Error deleting payroll:', error)
        return NextResponse.json(
            { error: 'Failed to delete payroll record' },
            { status: 500 }
        )
    }
}
