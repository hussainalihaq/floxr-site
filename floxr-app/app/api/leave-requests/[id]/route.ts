import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// GET /api/leave-requests/[id] - Get single leave request
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

        const leaveRequest = await prisma.leaveRequest.findFirst({
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

        if (!leaveRequest) {
            return NextResponse.json({ error: 'Leave request not found' }, { status: 404 })
        }

        return NextResponse.json({ leaveRequest })
    } catch (error) {
        console.error('Error fetching leave request:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// PUT /api/leave-requests/[id] - Update leave request
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
        const { startDate, endDate, leaveType, reason, status } = body

        // Verify leave request exists and belongs to company
        const existing = await prisma.leaveRequest.findFirst({
            where: {
                id,
                employee: {
                    companyId: user.companyId,
                },
            },
        })

        if (!existing) {
            return NextResponse.json({ error: 'Leave request not found' }, { status: 404 })
        }

        // Only allow updates if status is PENDING
        if (existing.status !== 'PENDING' && !status) {
            return NextResponse.json(
                { error: 'Cannot modify an already processed leave request' },
                { status: 400 }
            )
        }

        // Build update data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updateData: any = {}

        if (startDate !== undefined) {
            updateData.startDate = new Date(startDate)
        }

        if (endDate !== undefined) {
            updateData.endDate = new Date(endDate)
        }

        if (leaveType !== undefined) {
            updateData.leaveType = leaveType
        }

        if (reason !== undefined) {
            updateData.reason = reason
        }

        if (status !== undefined) {
            updateData.status = status
        }

        // Recalculate days if dates changed
        if (startDate || endDate) {
            const start = updateData.startDate || existing.startDate
            const end = updateData.endDate || existing.endDate
            const diffTime = Math.abs(end.getTime() - start.getTime())
            updateData.days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
        }

        const leaveRequest = await prisma.leaveRequest.update({
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

        return NextResponse.json({ leaveRequest })
    } catch (error) {
        console.error('Error updating leave request:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// DELETE /api/leave-requests/[id] - Cancel/delete leave request
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

        // Verify leave request exists and belongs to company
        const existing = await prisma.leaveRequest.findFirst({
            where: {
                id,
                employee: {
                    companyId: user.companyId,
                },
            },
        })

        if (!existing) {
            return NextResponse.json({ error: 'Leave request not found' }, { status: 404 })
        }

        // Only allow deletion if status is PENDING
        if (existing.status !== 'PENDING') {
            return NextResponse.json(
                { error: 'Cannot delete an already processed leave request' },
                { status: 400 }
            )
        }

        await prisma.leaveRequest.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting leave request:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
