import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// GET /api/leave-requests - List leave requests with filters
export async function GET(request: NextRequest) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const employeeId = searchParams.get('employeeId') || ''
        const status = searchParams.get('status') || ''
        const leaveType = searchParams.get('leaveType') || ''
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

        if (leaveType) {
            where.leaveType = leaveType
        }

        if (startDate) {
            where.startDate = {
                ...where.startDate,
                gte: new Date(startDate),
            }
        }

        if (endDate) {
            where.endDate = {
                ...where.endDate,
                lte: new Date(endDate),
            }
        }

        // Get total count
        const total = await prisma.leaveRequest.count({ where })

        // Get leave requests with pagination
        const leaveRequests = await prisma.leaveRequest.findMany({
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
            orderBy: { createdAt: 'desc' },
        })

        return NextResponse.json({
            leaveRequests,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        })
    } catch (error) {
        console.error('Error fetching leave requests:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// POST /api/leave-requests - Submit new leave request
export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { employeeId, startDate, endDate, leaveType, reason } = body

        if (!employeeId || !startDate || !endDate || !leaveType) {
            return NextResponse.json(
                { error: 'Employee ID, start date, end date, and leave type are required' },
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

        // Calculate days
        const start = new Date(startDate)
        const end = new Date(endDate)
        const diffTime = Math.abs(end.getTime() - start.getTime())
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // +1 to include both days

        // Check for overlapping leave requests
        const overlapping = await prisma.leaveRequest.findFirst({
            where: {
                employeeId,
                status: { in: ['PENDING', 'APPROVED'] },
                OR: [
                    {
                        startDate: { lte: end },
                        endDate: { gte: start },
                    },
                ],
            },
        })

        if (overlapping) {
            return NextResponse.json(
                { error: 'This leave request overlaps with an existing request' },
                { status: 400 }
            )
        }

        const leaveRequest = await prisma.leaveRequest.create({
            data: {
                employeeId,
                startDate: start,
                endDate: end,
                leaveType,
                reason: reason || null,
                days,
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

        return NextResponse.json({ leaveRequest }, { status: 201 })
    } catch (error) {
        console.error('Error creating leave request:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
