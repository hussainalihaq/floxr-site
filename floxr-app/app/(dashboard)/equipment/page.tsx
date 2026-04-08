import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import EquipmentClient from './EquipmentClient'

export default async function EquipmentPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch equipment with current assignments
    const equipment = await prisma.equipment.findMany({
        where: { companyId: user.companyId },
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

    // Fetch employees for assignment dropdown
    const employees = await prisma.employee.findMany({
        where: {
            companyId: user.companyId,
            status: { in: ['ACTIVE', 'ONBOARDING'] }
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            jobTitle: true,
        },
        orderBy: { firstName: 'asc' }
    })

    // Serialize
    const serializedEquipment = equipment.map(e => ({
        id: e.id,
        name: e.name,
        type: e.type,
        serialNumber: e.serialNumber,
        assetTag: e.assetTag,
        status: e.status,
        condition: e.condition,
        purchaseDate: e.purchaseDate?.toISOString() || null,
        purchasePrice: e.purchasePrice ? Number(e.purchasePrice) : null,
        notes: e.notes,
        assignedTo: e.assignments[0]?.employee
            ? {
                id: e.assignments[0].employee.id,
                name: `${e.assignments[0].employee.firstName} ${e.assignments[0].employee.lastName}`
            }
            : null,
        assignmentId: e.assignments[0]?.id || null,
    }))

    // Stats
    const stats = {
        total: equipment.length,
        available: equipment.filter(e => e.status === 'AVAILABLE').length,
        assigned: equipment.filter(e => e.status === 'ASSIGNED').length,
        maintenance: equipment.filter(e => e.status === 'MAINTENANCE').length,
    }

    return (
        <EquipmentClient
            equipment={serializedEquipment}
            employees={employees}
            stats={stats}
        />
    )
}
