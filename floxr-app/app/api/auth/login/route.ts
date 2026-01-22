import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            )
        }

        // Sign in with Supabase Auth
        const supabase = await createClient()
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (authError || !authData.user) {
            console.error('Supabase auth error:', authError?.message)
            return NextResponse.json(
                { error: authError?.message || 'Invalid email or password' },
                { status: 401 }
            )
        }

        // Get user from database
        const user = await prisma.user.findUnique({
            where: { authId: authData.user.id },
            include: { company: true },
        })

        if (!user) {
            return NextResponse.json(
                { error: 'User account not found' },
                { status: 404 }
            )
        }

        // Update last login
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        })

        // Log activity
        await prisma.activityLog.create({
            data: {
                action: 'USER_LOGGED_IN',
                userId: user.id,
                metadata: {
                    email: user.email,
                    timestamp: new Date().toISOString(),
                },
            },
        })

        return NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                company: user.company,
            },
            session: authData.session,
        })
    } catch (error: any) {
        console.error('Login error:', error)
        return NextResponse.json(
            { error: 'Login failed' },
            { status: 500 }
        )
    }
}
