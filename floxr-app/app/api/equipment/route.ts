import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// GET all equipment
export async function GET(request: NextRequest) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')
        const type = searchParams.get('type')

        const equipment = await prisma.equipment.findMany({
            where: {
                companyId: user.companyId,
                ...(status && { status }),
                ...(type && { type }),
            },
            include: {
                assignments: {
                    where: { returnedAt: null },
                    include: {
                        employee: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                            }
                        }
                    },
                    take: 1
                }
            },
            orderBy: { createdAt: 'desc' }
        })

        // Serialize
        const serialized = equipment.map(e => ({
            ...e,
            purchasePrice: e.purchasePrice ? Number(e.purchasePrice) : null,
            currentAssignment: e.assignments[0] || null,
            assignedTo: e.assignments[0]
                ? `${e.assignments[0].employee.firstName} ${e.assignments[0].employee.lastName}`
                : null
        }))

        return NextResponse.json({ equipment: serialized })
    } catch (error) {
        console.error('Error fetching equipment:', error)
        return NextResponse.json({ error: 'Failed to fetch equipment' }, { status: 500 })
    }
}

// POST create new equipment
export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { name, type, serialNumber, assetTag, condition, purchaseDate, purchasePrice, notes } = body

        if (!name || !type) {
            return NextResponse.json({ error: 'Name and type are required' }, { status: 400 })
        }

        const equipment = await prisma.equipment.create({
            data: {
                name,
                type,
                serialNumber,
                assetTag,
                condition: condition || 'GOOD',
                purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
                purchasePrice: purchasePrice || null,
                notes,
                companyId: user.companyId,
            }
        })

        return NextResponse.json({ equipment, message: 'Equipment added successfully' })
    } catch (error) {
        console.error('Error creating equipment:', error)
        return NextResponse.json({ error: 'Failed to create equipment' }, { status: 500 })
    }
}
