import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser, requireRole } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/companies/:id - Get company details
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const company = await prisma.company.findUnique({
            where: { id: params.id },
            include: {
                _count: {
                    select: {
                        users: true,
                        employees: true,
                    },
                },
            },
        })

        if (!company) {
            return NextResponse.json({ error: 'Company not found' }, { status: 404 })
        }

        // Check if user belongs to this company
        if (user.companyId !== company.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        return NextResponse.json({ company })
    } catch (error) {
        console.error('Get company error:', error)
        return NextResponse.json({ error: 'Failed to get company' }, { status: 500 })
    }
}

// PUT /api/companies/:id - Update company
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const userResult = await requireRole('ADMIN')
        if (userResult instanceof NextResponse) return userResult
        const user = userResult

        const body = await request.json()
        const { name, logo, industry, size, location, timezone, currency, language } = body

        // Check if user belongs to this company
        if (user.companyId !== params.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const company = await prisma.company.update({
            where: { id: params.id },
            data: {
                ...(name && { name }),
                ...(logo && { logo }),
                ...(industry && { industry }),
                ...(size && { size }),
                ...(location && { location }),
                ...(timezone && { timezone }),
                ...(currency && { currency }),
                ...(language && { language }),
            },
        })

        // Log activity
        await prisma.activityLog.create({
            data: {
                action: 'COMPANY_UPDATED',
                userId: user.id,
                metadata: {
                    companyId: company.id,
                    changes: body,
                },
            },
        })

        return NextResponse.json({ company })
    } catch (error) {
        console.error('Update company error:', error)
        return NextResponse.json({ error: 'Failed to update company' }, { status: 500 })
    }
}
