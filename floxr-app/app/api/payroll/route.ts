import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Decimal } from '@prisma/client/runtime/library'

// Helper to serialize Decimal values
function serializePayroll(payroll: any) {
    return {
        ...payroll,
        hoursWorked: payroll.hoursWorked ? Number(payroll.hoursWorked) : null,
        grossPay: Number(payroll.grossPay),
        deductions: Number(payroll.deductions),
        netPay: Number(payroll.netPay),
        employee: payroll.employee ? {
            ...payroll.employee,
            salary: payroll.employee.salary ? Number(payroll.employee.salary) : null,
            hourlyRate: payroll.employee.hourlyRate ? Number(payroll.employee.hourlyRate) : null,
        } : undefined
    }
}

// GET /api/payroll - List payroll records with filters
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const employeeId = searchParams.get('employeeId')
        const status = searchParams.get('status')
        const startDate = searchParams.get('startDate')
        const endDate = searchParams.get('endDate')
        const companyId = searchParams.get('companyId') || 'demo-company'
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '50')
        const skip = (page - 1) * limit

        // Build filters
        const where: any = {
            employee: {
                companyId
            }
        }

        if (employeeId) {
            where.employeeId = employeeId
        }

        if (status) {
            where.status = status
        }

        if (startDate || endDate) {
            where.payPeriodStart = {}
            if (startDate) {
                where.payPeriodStart.gte = new Date(startDate)
            }
            if (endDate) {
                where.payPeriodEnd = { lte: new Date(endDate) }
            }
        }

        const [payrolls, total] = await Promise.all([
            prisma.payroll.findMany({
                where,
                include: {
                    employee: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            jobTitle: true,
                            salary: true,
                            hourlyRate: true,
                            currency: true,
                            employmentType: true,
                        }
                    }
                },
                orderBy: { payPeriodStart: 'desc' },
                skip,
                take: limit
            }),
            prisma.payroll.count({ where })
        ])

        return NextResponse.json({
            payrolls: payrolls.map(serializePayroll),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('Error fetching payroll:', error)
        return NextResponse.json(
            { error: 'Failed to fetch payroll records' },
            { status: 500 }
        )
    }
}

// POST /api/payroll - Create payroll entry
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const {
            employeeId,
            payPeriodStart,
            payPeriodEnd,
            hoursWorked,
            grossPay,
            deductions = 0,
            netPay,
            status = 'PENDING'
        } = body

        // Validate required fields
        if (!employeeId || !payPeriodStart || !payPeriodEnd || grossPay === undefined) {
            return NextResponse.json(
                { error: 'Missing required fields: employeeId, payPeriodStart, payPeriodEnd, grossPay' },
                { status: 400 }
            )
        }

        // Verify employee exists
        const employee = await prisma.employee.findUnique({
            where: { id: employeeId }
        })

        if (!employee) {
            return NextResponse.json(
                { error: 'Employee not found' },
                { status: 404 }
            )
        }

        // Check for duplicate payroll in same period
        const existingPayroll = await prisma.payroll.findFirst({
            where: {
                employeeId,
                payPeriodStart: new Date(payPeriodStart),
                payPeriodEnd: new Date(payPeriodEnd)
            }
        })

        if (existingPayroll) {
            return NextResponse.json(
                { error: 'Payroll already exists for this employee in this pay period' },
                { status: 409 }
            )
        }

        // Calculate net pay if not provided
        const calculatedNetPay = netPay !== undefined ? netPay : grossPay - deductions

        const payroll = await prisma.payroll.create({
            data: {
                employeeId,
                payPeriodStart: new Date(payPeriodStart),
                payPeriodEnd: new Date(payPeriodEnd),
                hoursWorked: hoursWorked ? new Decimal(hoursWorked) : null,
                grossPay: new Decimal(grossPay),
                deductions: new Decimal(deductions),
                netPay: new Decimal(calculatedNetPay),
                status
            },
            include: {
                employee: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        jobTitle: true,
                    }
                }
            }
        })

        return NextResponse.json(serializePayroll(payroll), { status: 201 })
    } catch (error) {
        console.error('Error creating payroll:', error)
        return NextResponse.json(
            { error: 'Failed to create payroll record' },
            { status: 500 }
        )
    }
}
