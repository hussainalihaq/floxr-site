import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { prisma } from '@/lib/prisma'

// Use admin client to bypass email confirmation
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
)

export async function POST(request: NextRequest) {
    try {
        const { email, password, name, companyName } = await request.json()

        // Validation
        if (!email || !password || !name) {
            return NextResponse.json(
                { error: 'Email, password, and name are required' },
                { status: 400 }
            )
        }

        if (!companyName) {
            return NextResponse.json(
                { error: 'Company name is required' },
                { status: 400 }
            )
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters' },
                { status: 400 }
            )
        }

        // Check if user already exists in our database
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'An account with this email already exists' },
                { status: 400 }
            )
        }

        // Create auth user in Supabase with email_confirm option
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true, // Auto-confirm email - no verification needed
            user_metadata: {
                name,
            },
        })

        // If admin API fails, try regular signUp
        let userId = authData?.user?.id

        if (authError || !userId) {
            console.log('Admin create failed, trying regular signUp:', authError?.message)

            // Fallback to regular signup
            const { createClient: createServerClient } = await import('@/lib/supabase/server')
            const supabase = await createServerClient()

            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { name },
                    emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login`,
                },
            })

            if (signUpError || !signUpData.user) {
                return NextResponse.json(
                    { error: signUpError?.message || 'Failed to create account' },
                    { status: 400 }
                )
            }

            userId = signUpData.user.id
        }

        // Create company
        const company = await prisma.company.create({
            data: {
                name: companyName,
                email: email,
                plan: 'TRIAL',
                status: 'TRIAL',
                trialStartDate: new Date(),
                trialEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
            },
        })

        // Create user in our database
        const user = await prisma.user.create({
            data: {
                email,
                name,
                authId: userId,
                role: 'OWNER',
                companyId: company.id,
            },
            include: {
                company: true,
            },
        })

        return NextResponse.json({
            message: 'Account created successfully',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                company: user.company,
            },
        })
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to create account'
        console.error('Registration error:', errorMessage)
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        )
    }
}
