import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser, requireRole } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/users/:id - Get user details
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: { id: params.id },
            select: {
                id: true,
                email: true,
                name: true,
                avatar: true,
                role: true,
                phone: true,
                language: true,
                timezone: true,
                lastLoginAt: true,
                createdAt: true,
                company: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        // Users can only view users in their company
        if (user.company.id !== currentUser.companyId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        return NextResponse.json({ user })
    } catch (error) {
        console.error('Get user error:', error)
        return NextResponse.json({ error: 'Failed to get user' }, { status: 500 })
    }
}

// PATCH /api/users/:id - Update user role (Admin only)
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const currentUserResult = await requireRole('ADMIN')
        if (currentUserResult instanceof NextResponse) return currentUserResult
        const currentUser = currentUserResult

        const { role } = await request.json()

        if (!role) {
            return NextResponse.json({ error: 'Role is required' }, { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { id: params.id },
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        // Check same company
        if (user.companyId !== currentUser.companyId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        // Cannot change own role
        if (user.id === currentUser.id) {
            return NextResponse.json({ error: 'Cannot change your own role' }, { status: 400 })
        }

        // Cannot demote owner
        if (user.role === 'OWNER') {
            return NextResponse.json({ error: 'Cannot change owner role' }, { status: 400 })
        }

        const updatedUser = await prisma.user.update({
            where: { id: params.id },
            data: { role },
        })

        // Log activity
        await prisma.activityLog.create({
            data: {
                action: 'USER_ROLE_CHANGED',
                userId: currentUser.id,
                metadata: {
                    targetUserId: user.id,
                    targetUserEmail: user.email,
                    oldRole: user.role,
                    newRole: role,
                },
            },
        })

        return NextResponse.json({ user: updatedUser })
    } catch (error) {
        console.error('Update user role error:', error)
        return NextResponse.json({ error: 'Failed to update user role' }, { status: 500 })
    }
}

// DELETE /api/users/:id - Remove user (Admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const currentUserResult = await requireRole('ADMIN')
        if (currentUserResult instanceof NextResponse) return currentUserResult
        const currentUser = currentUserResult

        const user = await prisma.user.findUnique({
            where: { id: params.id },
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        // Check same company
        if (user.companyId !== currentUser.companyId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        // Cannot delete self
        if (user.id === currentUser.id) {
            return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 })
        }

        // Cannot delete owner
        if (user.role === 'OWNER') {
            return NextResponse.json({ error: 'Cannot delete owner' }, { status: 400 })
        }

        await prisma.user.delete({
            where: { id: params.id },
        })

        // Log activity
        await prisma.activityLog.create({
            data: {
                action: 'USER_REMOVED',
                userId: currentUser.id,
                metadata: {
                    removedUserId: user.id,
                    removedUserEmail: user.email,
                },
            },
        })

        return NextResponse.json({ message: 'User removed successfully' })
    } catch (error) {
        console.error('Delete user error:', error)
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
    }
}
