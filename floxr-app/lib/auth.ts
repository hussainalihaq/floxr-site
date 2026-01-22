import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export type UserRole = 'OWNER' | 'ADMIN' | 'MANAGER' | 'MEMBER' | 'VIEWER'

// Permission levels (higher number = more permissions)
const ROLE_LEVELS: Record<UserRole, number> = {
    OWNER: 5,
    ADMIN: 4,
    MANAGER: 3,
    MEMBER: 2,
    VIEWER: 1,
}

/**
 * Get the currently authenticated user from Supabase and link to our User model
 */
export async function getCurrentUser() {
    const supabase = await createClient()

    const { data: { user: authUser }, error } = await supabase.auth.getUser()

    if (error || !authUser) {
        return null
    }

    // Find user in our database
    const user = await prisma.user.findUnique({
        where: { authId: authUser.id },
        include: { company: true },
    })

    return user
}

/**
 * Check if user has required role or higher
 */
export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
    return ROLE_LEVELS[userRole] >= ROLE_LEVELS[requiredRole]
}

/**
 * Middleware to protect API routes
 */
export async function requireAuth() {
    const user = await getCurrentUser()

    if (!user) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        )
    }

    return user
}

/**
 * Middleware to require specific role
 */
export async function requireRole(requiredRole: UserRole) {
    const user = await getCurrentUser()

    if (!user) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        )
    }

    if (!hasRole(user.role as UserRole, requiredRole)) {
        return NextResponse.json(
            { error: 'Forbidden: Insufficient permissions' },
            { status: 403 }
        )
    }

    return user
}

/**
 * Check if user belongs to company
 */
export async function belongsToCompany(userId: string, companyId: string): Promise<boolean> {
    const user = await prisma.user.findFirst({
        where: {
            id: userId,
            companyId: companyId,
        },
    })

    return !!user
}
