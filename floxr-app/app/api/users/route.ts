import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser, requireRole } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/users - List company users
export async function GET(request: NextRequest) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const users = await prisma.user.findMany({
            where: { companyId: user.companyId },
            select: {
                id: true,
                email: true,
                name: true,
                avatar: true,
                role: true,
                lastLoginAt: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
        })

        return NextResponse.json({ users })
    } catch (error) {
        console.error('List users error:', error)
        return NextResponse.json({ error: 'Failed to list users' }, { status: 500 })
    }
}

// POST /api/users/invite - Invite new user
export async function POST(request: NextRequest) {
    try {
        const userResult = await requireRole('ADMIN')
        if (userResult instanceof NextResponse) return userResult
        const user = userResult

        const { email, role = 'MEMBER' } = await request.json()

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 })
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 })
        }

        // Check if invitation already sent
        const existingInvitation = await prisma.invitation.findFirst({
            where: {
                email,
                companyId: user.companyId,
                status: 'PENDING',
            },
        })

        if (existingInvitation) {
            return NextResponse.json({ error: 'Invitation already sent' }, { status: 409 })
        }

        // Create invitation
        const token = crypto.randomUUID()
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

        const invitation = await prisma.invitation.create({
            data: {
                email,
                role,
                token,
                expiresAt,
                companyId: user.companyId,
                invitedBy: user.email,
            },
        })

        // TODO: Send invitation email using Resend
        // For now, return the invitation link
        const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/accept-invite?token=${token}`

        // Log activity
        await prisma.activityLog.create({
            data: {
                action: 'USER_INVITED',
                userId: user.id,
                metadata: {
                    invitedEmail: email,
                    role,
                },
            },
        })

        return NextResponse.json({
            invitation: {
                id: invitation.id,
                email: invitation.email,
                role: invitation.role,
                expiresAt: invitation.expiresAt,
            },
            inviteLink, // Remove this in production
        })
    } catch (error) {
        console.error('Invite user error:', error)
        return NextResponse.json({ error: 'Failed to invite user' }, { status: 500 })
    }
}
