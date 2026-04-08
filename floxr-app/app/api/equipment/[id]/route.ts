import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// GET single equipment
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const equipment = await prisma.equipment.findFirst({
            where: {
                id: params.id,
                companyId: user.companyId,
            },
            include: {
                assignments: {
                    include: {
                        employee: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                jobTitle: true,
                            }
                        }
                    },
                    orderBy: { assignedAt: 'desc' }
                }
            }
        })

        if (!equipment) {
            return NextResponse.json({ error: 'Equipment not found' }, { status: 404 })
        }

        return NextResponse.json({ equipment })
    } catch (error) {
        console.error('Error fetching equipment:', error)
        return NextResponse.json({ error: 'Failed to fetch equipment' }, { status: 500 })
    }
}

// PUT update equipment
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { name, type, serialNumber, assetTag, status, condition, notes } = body

        const equipment = await prisma.equipment.update({
            where: { id: params.id },
            data: {
                ...(name && { name }),
                ...(type && { type }),
                ...(serialNumber !== undefined && { serialNumber }),
                ...(assetTag !== undefined && { assetTag }),
                ...(status && { status }),
                ...(condition && { condition }),
                ...(notes !== undefined && { notes }),
            }
        })

        return NextResponse.json({ equipment, message: 'Equipment updated' })
    } catch (error) {
        console.error('Error updating equipment:', error)
        return NextResponse.json({ error: 'Failed to update equipment' }, { status: 500 })
    }
}

// DELETE equipment
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        await prisma.equipment.delete({
            where: { id: params.id }
        })

        return NextResponse.json({ message: 'Equipment deleted' })
    } catch (error) {
        console.error('Error deleting equipment:', error)
        return NextResponse.json({ error: 'Failed to delete equipment' }, { status: 500 })
    }
}
