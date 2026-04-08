import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// GET /api/timesheets/[id] - Get single timesheet
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

        const timesheet = await prisma.timesheet.findFirst({
            where: {
                id,
                employee: {
                    companyId: user.companyId,
                },
            },
            include: {
                employee: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        department: {
                            select: { name: true },
                        },
                    },
                },
            },
        })

        if (!timesheet) {
            return NextResponse.json({ error: 'Timesheet not found' }, { status: 404 })
        }

        return NextResponse.json({
            timesheet: {
                ...timesheet,
                hoursWorked: timesheet.hoursWorked ? Number(timesheet.hoursWorked) : null,
            },
        })
    } catch (error) {
        console.error('Error fetching timesheet:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// PUT /api/timesheets/[id] - Update timesheet
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

        const body = await request.json()
        const { clockIn, clockOut, notes, status } = body

        // Verify timesheet exists and belongs to company
        const existing = await prisma.timesheet.findFirst({
            where: {
                id,
                employee: {
                    companyId: user.companyId,
                },
            },
        })

        if (!existing) {
            return NextResponse.json({ error: 'Timesheet not found' }, { status: 404 })
        }

        // Build update data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updateData: any = {}

        if (clockIn !== undefined) {
            updateData.clockIn = new Date(clockIn)
        }

        if (clockOut !== undefined) {
            updateData.clockOut = clockOut ? new Date(clockOut) : null
        }

        if (notes !== undefined) {
            updateData.notes = notes
        }

        if (status !== undefined) {
            updateData.status = status
        }

        // Recalculate hours if clock times changed
        const finalClockIn = updateData.clockIn || existing.clockIn
        const finalClockOut = updateData.clockOut !== undefined ? updateData.clockOut : existing.clockOut

        if (finalClockOut) {
            const diff = new Date(finalClockOut).getTime() - new Date(finalClockIn).getTime()
            updateData.hoursWorked = diff / (1000 * 60 * 60)
        }

        const timesheet = await prisma.timesheet.update({
            where: { id },
            data: updateData,
            include: {
                employee: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        })

        return NextResponse.json({
            timesheet: {
                ...timesheet,
                hoursWorked: timesheet.hoursWorked ? Number(timesheet.hoursWorked) : null,
            },
        })
    } catch (error) {
        console.error('Error updating timesheet:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// DELETE /api/timesheets/[id] - Delete timesheet
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

        // Verify timesheet exists and belongs to company
        const existing = await prisma.timesheet.findFirst({
            where: {
                id,
                employee: {
                    companyId: user.companyId,
                },
            },
        })

        if (!existing) {
            return NextResponse.json({ error: 'Timesheet not found' }, { status: 404 })
        }

        await prisma.timesheet.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting timesheet:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
