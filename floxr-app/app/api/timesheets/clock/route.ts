import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// POST /api/timesheets/clock - Smart clock in/out toggle
// This endpoint automatically determines if the employee should clock in or out
export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { employeeId, notes } = body

        if (!employeeId) {
            return NextResponse.json(
                { error: 'Employee ID is required' },
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

        // Check if there's an open timesheet (clocked in but not out)
        const openTimesheet = await prisma.timesheet.findFirst({
            where: {
                employeeId,
                clockOut: null,
            },
            orderBy: { clockIn: 'desc' },
        })

        const now = new Date()

        if (openTimesheet) {
            // Calculate duration
            const diff = now.getTime() - openTimesheet.clockIn.getTime()
            const hoursWorked = diff / (1000 * 60 * 60)

            // SAFETY CHECK: Stale Shift Detection (> 20 hours)
            // If the shift is impossibly long (e.g. forgot to clock out yesterday), 
            // we should auto-close the old one and assume this is a NEW clock-in.
            // But if it's just an overnight shift (e.g. 10 hours), we process as normal clock-out.
            if (hoursWorked > 20) {
                // 1. Auto-close the stale shift (capped at 12 hours or just marked)
                await prisma.timesheet.update({
                    where: { id: openTimesheet.id },
                    data: {
                        clockOut: new Date(openTimesheet.clockIn.getTime() + 12 * 60 * 60 * 1000), // Cap at 12 hours
                        hoursWorked: 12.0,
                        notes: (openTimesheet.notes ? openTimesheet.notes + '\n' : '') + '[System: Auto-closed stale shift > 20hrs]',
                        status: 'APPROVED', // Auto-approve or flag for review
                    },
                })

                // 2. Create NEW clock-in for right now
                const newTimesheet = await prisma.timesheet.create({
                    data: {
                        employeeId,
                        clockIn: now,
                        notes: notes || null,
                        status: 'PENDING',
                    },
                    include: {
                        employee: { select: { id: true, firstName: true, lastName: true } },
                    },
                })

                return NextResponse.json({
                    action: 'CLOCK_IN',
                    timesheet: { ...newTimesheet, hoursWorked: null },
                    message: 'Previous session timed out. You are now clocked IN.',
                }, { status: 201 })
            }

            // Normal Clock OUT (including overnight shifts like 11:59 PM -> 12:01 AM)
            const timesheet = await prisma.timesheet.update({
                where: { id: openTimesheet.id },
                data: {
                    clockOut: now,
                    hoursWorked,
                    notes: notes || openTimesheet.notes,
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
                action: 'CLOCK_OUT',
                timesheet: {
                    ...timesheet,
                    hoursWorked: timesheet.hoursWorked ? Number(timesheet.hoursWorked) : null,
                },
                message: `Clocked out after ${hoursWorked.toFixed(2)} hours`,
            })
        } else {
            // Clock IN - create new timesheet
            const timesheet = await prisma.timesheet.create({
                data: {
                    employeeId,
                    clockIn: now,
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
                action: 'CLOCK_IN',
                timesheet: {
                    ...timesheet,
                    hoursWorked: null,
                },
                message: 'Clocked in successfully',
            }, { status: 201 })
        }
    } catch (error) {
        console.error('Error clocking in/out:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// GET /api/timesheets/clock - Get current clock status for an employee
export async function GET(request: NextRequest) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const employeeId = searchParams.get('employeeId')

        if (!employeeId) {
            return NextResponse.json(
                { error: 'Employee ID is required' },
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

        // Check if there's an open timesheet
        const openTimesheet = await prisma.timesheet.findFirst({
            where: {
                employeeId,
                clockOut: null,
            },
            orderBy: { clockIn: 'desc' },
        })

        // Get today's completed timesheets
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        const todayTimesheets = await prisma.timesheet.findMany({
            where: {
                employeeId,
                clockIn: {
                    gte: today,
                    lt: tomorrow,
                },
                clockOut: { not: null },
            },
        })

        // Calculate total hours today
        const totalHoursToday = todayTimesheets.reduce((sum, t) => {
            return sum + (t.hoursWorked ? Number(t.hoursWorked) : 0)
        }, 0)

        return NextResponse.json({
            isClockedIn: !!openTimesheet,
            currentSession: openTimesheet ? {
                id: openTimesheet.id,
                clockIn: openTimesheet.clockIn,
                elapsedMinutes: Math.floor((Date.now() - openTimesheet.clockIn.getTime()) / (1000 * 60)),
            } : null,
            todayStats: {
                totalHours: totalHoursToday,
                sessions: todayTimesheets.length,
            },
        })
    } catch (error) {
        console.error('Error getting clock status:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
