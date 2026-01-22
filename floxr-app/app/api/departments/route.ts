import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// GET /api/departments - List departments
export async function GET() {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const departments = await prisma.department.findMany({
            where: { companyId: user.companyId },
            include: {
                _count: {
                    select: { employees: true },
                },
            },
            orderBy: { name: 'asc' },
        })

        return NextResponse.json({ departments })
    } catch (error) {
        console.error('Error fetching departments:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// POST /api/departments - Create department
export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { name } = await request.json()

        if (!name) {
            return NextResponse.json(
                { error: 'Department name is required' },
                { status: 400 }
            )
        }

        // Check if department already exists
        const existing = await prisma.department.findFirst({
            where: {
                name: { equals: name, mode: 'insensitive' },
                companyId: user.companyId,
            },
        })

        if (existing) {
            return NextResponse.json(
                { error: 'A department with this name already exists' },
                { status: 400 }
            )
        }

        const department = await prisma.department.create({
            data: {
                name,
                companyId: user.companyId,
            },
        })

        return NextResponse.json({ department }, { status: 201 })
    } catch (error) {
        console.error('Error creating department:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
