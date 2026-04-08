import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// GET export payroll as CSV
export async function GET(request: NextRequest) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const startDate = searchParams.get('startDate')
        const endDate = searchParams.get('endDate')
        const status = searchParams.get('status') // Optional: PENDING, PROCESSED, PAID

        if (!startDate || !endDate) {
            return NextResponse.json({
                error: 'Start date and end date are required'
            }, { status: 400 })
        }

        // Fetch payroll records
        const payrolls = await prisma.payroll.findMany({
            where: {
                employee: { companyId: user.companyId },
                payPeriodStart: { gte: new Date(startDate) },
                payPeriodEnd: { lte: new Date(endDate) },
                ...(status && { status }),
            },
            include: {
                employee: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                        jobTitle: true,
                        currency: true,
                        department: { select: { name: true } }
                    }
                }
            },
            orderBy: [
                { payPeriodStart: 'desc' },
                { employee: { firstName: 'asc' } }
            ]
        })

        if (payrolls.length === 0) {
            return NextResponse.json({
                error: 'No payroll records found for the selected period'
            }, { status: 404 })
        }

        // Generate CSV content
        const headers = [
            'Employee Name',
            'Email',
            'Job Title',
            'Department',
            'Pay Period Start',
            'Pay Period End',
            'Hours Worked',
            'Gross Pay',
            'Deductions',
            'Net Pay',
            'Currency',
            'Status',
            'Paid At'
        ]

        const rows = payrolls.map(p => [
            `${p.employee.firstName} ${p.employee.lastName}`,
            p.employee.email,
            p.employee.jobTitle || '',
            p.employee.department?.name || '',
            p.payPeriodStart.toISOString().split('T')[0],
            p.payPeriodEnd.toISOString().split('T')[0],
            p.hoursWorked ? Number(p.hoursWorked).toFixed(1) : '',
            Number(p.grossPay).toFixed(2),
            Number(p.deductions).toFixed(2),
            Number(p.netPay).toFixed(2),
            p.employee.currency,
            p.status,
            p.paidAt ? p.paidAt.toISOString().split('T')[0] : ''
        ])

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell =>
                // Escape cells with commas or quotes
                typeof cell === 'string' && (cell.includes(',') || cell.includes('"'))
                    ? `"${cell.replace(/"/g, '""')}"`
                    : cell
            ).join(','))
        ].join('\n')

        // Log the export
        await prisma.payrollAuditLog.create({
            data: {
                action: 'EXPORT_CSV',
                details: {
                    startDate,
                    endDate,
                    recordCount: payrolls.length,
                    exportedBy: user.email
                },
                userId: user.id,
                companyId: user.companyId,
            }
        })

        // Return CSV file
        const filename = `payroll_${startDate}_to_${endDate}.csv`

        return new NextResponse(csvContent, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': `attachment; filename="${filename}"`,
            }
        })

    } catch (error) {
        console.error('Error exporting payroll:', error)
        return NextResponse.json({ error: 'Failed to export payroll' }, { status: 500 })
    }
}
