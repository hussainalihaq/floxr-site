import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/payroll/[id]/mark-paid - Mark payroll as paid
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        // Verify payroll exists
        const existingPayroll = await prisma.payroll.findUnique({
            where: { id },
            include: {
                employee: {
                    select: {
                        firstName: true,
                        lastName: true,
                        companyId: true
                    }
                }
            }
        })

        if (!existingPayroll) {
            return NextResponse.json(
                { error: 'Payroll record not found' },
                { status: 404 }
            )
        }

        // Check if already paid
        if (existingPayroll.status === 'PAID') {
            return NextResponse.json(
                { error: 'Payroll is already marked as paid' },
                { status: 400 }
            )
        }

        // Update status to PAID
        const payroll = await prisma.payroll.update({
            where: { id },
            data: {
                status: 'PAID',
                paidAt: new Date()
            },
            include: {
                employee: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    }
                }
            }
        })

        // Log activity (if activity log exists)
        try {
            // This is optional - only if you have activity logging setup
            // await prisma.activityLog.create({ ... })
        } catch (e) {
            // Ignore activity log errors
        }

        return NextResponse.json({
            success: true,
            message: `Payroll marked as paid for ${payroll.employee.firstName} ${payroll.employee.lastName}`,
            payroll: {
                id: payroll.id,
                employeeId: payroll.employeeId,
                status: payroll.status,
                paidAt: payroll.paidAt,
                netPay: Number(payroll.netPay)
            }
        })
    } catch (error) {
        console.error('Error marking payroll as paid:', error)
        return NextResponse.json(
            { error: 'Failed to mark payroll as paid' },
            { status: 500 }
        )
    }
}
