import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// POST assign equipment to employee
export async function POST(
    request: NextRequest,
    context: any
) {
    const params = await context.params;
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { employeeId, notes } = body

        if (!employeeId) {
            return NextResponse.json({ error: 'Employee ID is required' }, { status: 400 })
        }

        // Check if equipment is already assigned
        const existingAssignment = await prisma.equipmentAssignment.findFirst({
            where: {
                equipmentId: params.id,
                returnedAt: null,
            }
        })

        if (existingAssignment) {
            return NextResponse.json({
                error: 'Equipment is already assigned. Please return it first.'
            }, { status: 400 })
        }

        // Create assignment
        const assignment = await prisma.equipmentAssignment.create({
            data: {
                equipmentId: params.id,
                employeeId,
                notes,
            },
            include: {
                employee: {
                    select: { firstName: true, lastName: true }
                }
            }
        })

        // Update equipment status
        await prisma.equipment.update({
            where: { id: params.id },
            data: { status: 'ASSIGNED' }
        })

        return NextResponse.json({
            assignment,
            message: `Equipment assigned to ${assignment.employee.firstName} ${assignment.employee.lastName}`
        })
    } catch (error) {
        console.error('Error assigning equipment:', error)
        return NextResponse.json({ error: 'Failed to assign equipment' }, { status: 500 })
    }
}

// PUT return equipment
export async function PUT(
    request: NextRequest,
    context: any
) {
    const params = await context.params;
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { returnReason, conditionOnReturn, notes } = body

        // Find current assignment
        const assignment = await prisma.equipmentAssignment.findFirst({
            where: {
                equipmentId: params.id,
                returnedAt: null,
            }
        })

        if (!assignment) {
            return NextResponse.json({
                error: 'No active assignment found for this equipment'
            }, { status: 400 })
        }

        // Update assignment with return info
        await prisma.equipmentAssignment.update({
            where: { id: assignment.id },
            data: {
                returnedAt: new Date(),
                returnReason: returnReason || 'RETURNED',
                conditionOnReturn,
                notes,
            }
        })

        // Update equipment status and condition
        await prisma.equipment.update({
            where: { id: params.id },
            data: {
                status: 'AVAILABLE',
                condition: conditionOnReturn || undefined,
            }
        })

        return NextResponse.json({ message: 'Equipment returned successfully' })
    } catch (error) {
        console.error('Error returning equipment:', error)
        return NextResponse.json({ error: 'Failed to return equipment' }, { status: 500 })
    }
}
