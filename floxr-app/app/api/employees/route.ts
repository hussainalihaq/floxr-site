import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// GET /api/employees - List employees with filters
export async function GET(request: NextRequest) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '20')
        const search = searchParams.get('search') || ''
        const status = searchParams.get('status') || ''
        const departmentId = searchParams.get('departmentId') || ''

        // Build where clause
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const where: any = {
            companyId: user.companyId,
        }

        if (search) {
            where.OR = [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ]
        }

        if (status) {
            where.status = status
        }

        if (departmentId) {
            where.departmentId = departmentId
        }

        // Get total count
        const total = await prisma.employee.count({ where })

        // Get employees with pagination
        const employees = await prisma.employee.findMany({
            where,
            include: {
                department: true,
            },
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { createdAt: 'desc' },
        })

        return NextResponse.json({
            employees,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        })
    } catch (error) {
        console.error('Error fetching employees:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// POST /api/employees - Create new employee
export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const {
            firstName,
            lastName,
            email,
            phone,
            whatsappNumber,
            personalEmail,
            jobTitle,
            departmentId,
            employmentType,
            startDate,
            salary,
            currency,
            taxId,
            taxIdType,
        } = body

        // Validate required fields
        if (!firstName || !lastName || !email || !startDate) {
            return NextResponse.json(
                { error: 'First name, last name, email, and start date are required' },
                { status: 400 }
            )
        }

        // Check if employee already exists
        const existing = await prisma.employee.findUnique({
            where: { email },
        })

        if (existing) {
            return NextResponse.json(
                { error: 'An employee with this email already exists' },
                { status: 400 }
            )
        }

        // Create employee - using type assertion to handle schema differences
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const employeeData: any = {
            firstName,
            lastName,
            email,
            phone: phone || null,
            startDate: new Date(startDate),
            employmentType: employmentType || 'FULL_TIME',
            status: 'ONBOARDING',
            companyId: user.companyId,
        }

        // Add optional fields if they exist in schema
        if (departmentId) employeeData.departmentId = departmentId
        if (whatsappNumber) employeeData.whatsappNumber = whatsappNumber
        if (personalEmail) employeeData.personalEmail = personalEmail
        if (jobTitle) employeeData.jobTitle = jobTitle
        if (salary) employeeData.salary = parseFloat(salary)
        if (currency) employeeData.currency = currency
        if (taxId) employeeData.taxId = taxId
        if (taxIdType) employeeData.taxIdType = taxIdType

        const employee = await prisma.employee.create({
            data: employeeData,
            include: {
                department: true,
            },
        })

        // Log activity
        try {
            await prisma.activityLog.create({
                data: {
                    action: 'EMPLOYEE_ADDED',
                    metadata: {
                        employeeId: employee.id,
                        employeeName: `${firstName} ${lastName}`,
                    },
                    userId: user.id,
                },
            })
        } catch {
            // Activity log is optional, don't fail if it errors
        }

        return NextResponse.json({ employee }, { status: 201 })
    } catch (error) {
        console.error('Error creating employee:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
