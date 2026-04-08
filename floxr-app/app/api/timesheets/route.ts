import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// GET /api/timesheets - List timesheets with filters
export async function GET(request: NextRequest) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const employeeId = searchParams.get('employeeId') || ''
        const status = searchParams.get('status') || ''
        const startDate = searchParams.get('startDate') || ''
        const endDate = searchParams.get('endDate') || ''
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '20')

        // Build where clause
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const where: any = {
            employee: {
                companyId: user.companyId,
            },
        }

        if (employeeId) {
            where.employeeId = employeeId
        }

        if (status) {
            where.status = status
        }

        if (startDate) {
            where.clockIn = {
                ...where.clockIn,
                gte: new Date(startDate),
            }
        }

        if (endDate) {
            where.clockIn = {
                ...where.clockIn,
                lte: new Date(endDate),
            }
        }

        // Get total count
        const total = await prisma.timesheet.count({ where })

        // Get timesheets with pagination
        const timesheets = await prisma.timesheet.findMany({
            where,
            include: {
                employee: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        department: {
                            select: { name: true },
                        },
                    },
                },
            },
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { clockIn: 'desc' },
        })

        // Serialize Decimal fields
        const serialized = timesheets.map(t => ({
            ...t,
            hoursWorked: t.hoursWorked ? Number(t.hoursWorked) : null,
        }))

        return NextResponse.json({
            timesheets: serialized,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        })
    } catch (error) {
        console.error('Error fetching timesheets:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// POST /api/timesheets - Create new timesheet entry
export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { employeeId, clockIn, clockOut, notes } = body

        if (!employeeId || !clockIn) {
            return NextResponse.json(
                { error: 'Employee ID and clock-in time are required' },
                { status: 400 }
            )
        }

        // Verify employee belongs to company
        const employee = await prisma.employee.findFirst({
            where: {
                id: employeeId,
                companyId: user.companyId,
            },
        })

        if (!employee) {
            return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
        }

        // Calculate hours if both clock in and out provided
        let hoursWorked = null
        if (clockOut) {
            const diff = new Date(clockOut).getTime() - new Date(clockIn).getTime()
            hoursWorked = diff / (1000 * 60 * 60) // Convert ms to hours
        }

        const timesheet = await prisma.timesheet.create({
            data: {
                employeeId,
                clockIn: new Date(clockIn),
                clockOut: clockOut ? new Date(clockOut) : null,
                hoursWorked,
                notes: notes || null,
                status: 'PENDING',
            },
            include: {
                employee: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        })

        return NextResponse.json({
            timesheet: {
                ...timesheet,
                hoursWorked: timesheet.hoursWorked ? Number(timesheet.hoursWorked) : null,
            },
        }, { status: 201 })
    } catch (error) {
        console.error('Error creating timesheet:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
