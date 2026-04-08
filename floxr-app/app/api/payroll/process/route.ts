import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Decimal } from '@prisma/client/runtime/library'

// POST /api/payroll/process - Process payroll for employees
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const {
            companyId,
            payPeriodStart,
            payPeriodEnd,
            employeeId,       // Optional: process single employee
            departmentId,     // Optional: process single department
            deductionRate = 0 // Percentage for deductions (placeholder)
        } = body

        if (!companyId) {
            return NextResponse.json(
                { error: 'Missing required field: companyId' },
                { status: 400 }
            )
        }

        if (!payPeriodStart || !payPeriodEnd) {
            return NextResponse.json(
                { error: 'Missing required fields: payPeriodStart, payPeriodEnd' },
                { status: 400 }
            )
        }

        const periodStart = new Date(payPeriodStart)
        const periodEnd = new Date(payPeriodEnd)

        // Validate dates
        if (periodStart >= periodEnd) {
            return NextResponse.json(
                { error: 'Pay period start must be before end date' },
                { status: 400 }
            )
        }

        // Build employee filter
        const employeeWhere: any = {
            companyId,
            status: { in: ['ACTIVE', 'ONBOARDING'] }
        }

        // Filter by specific employee
        if (employeeId) {
            employeeWhere.id = employeeId
        }

        // Filter by department
        if (departmentId) {
            employeeWhere.departmentId = departmentId
        }

        // Get employees
        const employees = await prisma.employee.findMany({
            where: employeeWhere,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                salary: true,
                hourlyRate: true,
                employmentType: true,
                currency: true,
                departmentId: true,
                department: {
                    select: { name: true }
                }
            }
        })

        if (employees.length === 0) {
            return NextResponse.json(
                { error: 'No employees found matching the criteria' },
                { status: 404 }
            )
        }

        // Calculate working days in the period
        const workingDays = calculateWorkingDays(periodStart, periodEnd)
        const totalDays = Math.ceil((periodEnd.getTime() - periodStart.getTime()) / (1000 * 60 * 60 * 24)) + 1

        const results = {
            processed: 0,
            skipped: 0,
            errors: [] as string[],
            payrolls: [] as any[]
        }

        for (const employee of employees) {
            try {
                // Check if payroll already exists for this period
                const existingPayroll = await prisma.payroll.findFirst({
                    where: {
                        employeeId: employee.id,
                        payPeriodStart: periodStart,
                        payPeriodEnd: periodEnd
                    }
                })

                if (existingPayroll) {
                    results.skipped++
                    results.errors.push(`${employee.firstName} ${employee.lastName}: Payroll already exists for this period`)
                    continue
                }

                // Get ALL timesheet hours for the period (not just approved - for visibility)
                // Also include timesheets where clockIn is within period OR clockOut is within period
                const timesheets = await prisma.timesheet.findMany({
                    where: {
                        employeeId: employee.id,
                        OR: [
                            {
                                clockIn: {
                                    gte: periodStart,
                                    lte: periodEnd
                                }
                            },
                            {
                                clockOut: {
                                    gte: periodStart,
                                    lte: periodEnd
                                }
                            }
                        ]
                    }
                })

                // Calculate total hours (including pending/approved)
                const totalHours = timesheets.reduce((sum, ts) => {
                    return sum + (ts.hoursWorked ? Number(ts.hoursWorked) : 0)
                }, 0)

                // Calculate gross pay based on employment type
                let grossPay = 0
                let calculationMethod = ''

                if (employee.hourlyRate && Number(employee.hourlyRate) > 0) {
                    // Hourly employee - use actual hours worked
                    if (totalHours > 0) {
                        grossPay = totalHours * Number(employee.hourlyRate)
                        calculationMethod = 'hourly'
                    } else {
                        // No hours recorded, estimate based on working days (8 hours/day)
                        grossPay = workingDays * 8 * Number(employee.hourlyRate)
                        calculationMethod = 'hourly-estimated'
                    }
                } else if (employee.salary && Number(employee.salary) > 0) {
                    // Salaried employee - prorate based on actual days in period
                    const monthlyRate = Number(employee.salary)

                    // Calculate based on actual working days in period
                    // Standard assumption: 22 working days per month
                    const dailyRate = monthlyRate / 22
                    grossPay = dailyRate * workingDays
                    calculationMethod = 'salary'
                } else {
                    // No rate set, skip
                    results.errors.push(`${employee.firstName} ${employee.lastName}: No salary or hourly rate set`)
                    results.skipped++
                    continue
                }

                // Apply deductions
                const deductions = grossPay * (deductionRate / 100)
                const netPay = grossPay - deductions

                // Create payroll record
                const payroll = await prisma.payroll.create({
                    data: {
                        employeeId: employee.id,
                        payPeriodStart: periodStart,
                        payPeriodEnd: periodEnd,
                        hoursWorked: totalHours > 0 ? new Decimal(totalHours) : new Decimal(workingDays * 8),
                        grossPay: new Decimal(grossPay),
                        deductions: new Decimal(deductions),
                        netPay: new Decimal(netPay),
                        status: 'PROCESSED'
                    }
                })

                results.processed++
                results.payrolls.push({
                    id: payroll.id,
                    employeeId: employee.id,
                    employeeName: `${employee.firstName} ${employee.lastName}`,
                    department: employee.department?.name || null,
                    hoursWorked: totalHours > 0 ? totalHours : workingDays * 8,
                    grossPay: Math.round(grossPay * 100) / 100,
                    deductions: Math.round(deductions * 100) / 100,
                    netPay: Math.round(netPay * 100) / 100,
                    calculationMethod
                })
            } catch (err: any) {
                results.errors.push(`${employee.firstName} ${employee.lastName}: ${err.message || err}`)
            }
        }

        return NextResponse.json({
            success: true,
            message: `Processed ${results.processed} payroll(s), skipped ${results.skipped}`,
            payPeriod: {
                start: periodStart.toISOString(),
                end: periodEnd.toISOString(),
                totalDays,
                workingDays
            },
            ...results
        })
    } catch (error) {
        console.error('Error processing payroll:', error)
        return NextResponse.json(
            { error: 'Failed to process payroll' },
            { status: 500 }
        )
    }
}

// Helper: Calculate working days (Mon-Fri) between two dates
function calculateWorkingDays(start: Date, end: Date): number {
    let count = 0
    const current = new Date(start)

    while (current <= end) {
        const day = current.getDay()
        if (day !== 0 && day !== 6) { // Not Sunday (0) or Saturday (6)
            count++
        }
        current.setDate(current.getDate() + 1)
    }

    return count
}
