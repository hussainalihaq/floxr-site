import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
    try {
        const user = await getCurrentUser()

        if (!user) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            )
        }

        return NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                avatar: user.avatar,
                company: user.company,
            },
        })
    } catch (error) {
        console.error('Get user error:', error)
        return NextResponse.json(
            { error: 'Failed to get user' },
            { status: 500 }
        )
    }
}
