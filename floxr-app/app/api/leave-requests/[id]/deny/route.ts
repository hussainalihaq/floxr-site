import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// POST /api/leave-requests/[id]/deny - Deny leave request
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Check user has approval permission (OWNER, ADMIN, or MANAGER)
        if (!['OWNER', 'ADMIN', 'MANAGER'].includes(user.role)) {
            return NextResponse.json(
                { error: 'You do not have permission to deny leave requests' },
                { status: 403 }
            )
        }

        const body = await request.json().catch(() => ({}))
        const { reason } = body

        // Verify leave request exists and belongs to company
        const leaveRequest = await prisma.leaveRequest.findFirst({
            where: {
                id,
                employee: {
                    companyId: user.companyId,
                },
            },
            include: {
                employee: true,
            },
        })

        if (!leaveRequest) {
            return NextResponse.json({ error: 'Leave request not found' }, { status: 404 })
        }

        // Only allow denying PENDING requests
        if (leaveRequest.status !== 'PENDING') {
            return NextResponse.json(
                { error: 'This leave request has already been processed' },
                { status: 400 }
            )
        }

        const updated = await prisma.leaveRequest.update({
            where: { id },
            data: {
                status: 'DENIED',
                approvedBy: user.id, // Track who denied it
                reason: reason ? `Denied: ${reason}` : leaveRequest.reason,
            },
            include: {
                employee: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        })

        // Log activity
        try {
            await prisma.activityLog.create({
                data: {
                    action: 'LEAVE_DENIED',
                    metadata: {
                        leaveRequestId: id,
                        employeeName: `${updated.employee.firstName} ${updated.employee.lastName}`,
                        days: updated.days,
                        leaveType: updated.leaveType,
                        denyReason: reason || 'No reason provided',
                    },
                    userId: user.id,
                },
            })
        } catch {
            // Activity log is optional
        }

        return NextResponse.json({
            leaveRequest: updated,
            message: 'Leave request denied',
        })
    } catch (error) {
        console.error('Error denying leave request:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
