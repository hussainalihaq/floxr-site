import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import crypto from 'crypto'

// GET list all consultants
export async function GET(request: NextRequest) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Only OWNER/ADMIN can view consultants
        if (!['OWNER', 'ADMIN'].includes(user.role)) {
            return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
        }

        const consultants = await prisma.payrollConsultant.findMany({
            where: { companyId: user.companyId },
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json({ consultants })
    } catch (error) {
        console.error('Error fetching consultants:', error)
        return NextResponse.json({ error: 'Failed to fetch consultants' }, { status: 500 })
    }
}

// POST invite a new consultant
export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Only OWNER/ADMIN can invite consultants
        if (!['OWNER', 'ADMIN'].includes(user.role)) {
            return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
        }

        const body = await request.json()
        const { email, name, permissions, expiresInDays } = body

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 })
        }

        // Check if already exists
        const existing = await prisma.payrollConsultant.findUnique({
            where: {
                email_companyId: { email, companyId: user.companyId }
            }
        })

        if (existing && existing.status === 'ACTIVE') {
            return NextResponse.json({
                error: 'Consultant with this email already has access'
            }, { status: 400 })
        }

        // Generate unique access token
        const accessToken = crypto.randomBytes(32).toString('hex')

        // Calculate expiry
        const expiresAt = expiresInDays
            ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000)
            : null

        // Create or update consultant
        const consultant = existing
            ? await prisma.payrollConsultant.update({
                where: { id: existing.id },
                data: {
                    name,
                    accessToken,
                    permissions: permissions || 'VIEW_ONLY',
                    status: 'ACTIVE',
                    invitedBy: user.id,
                    expiresAt,
                }
            })
            : await prisma.payrollConsultant.create({
                data: {
                    email,
                    name,
                    accessToken,
                    permissions: permissions || 'VIEW_ONLY',
                    invitedBy: user.id,
                    expiresAt,
                    companyId: user.companyId,
                }
            })

        // Log the action
        await prisma.payrollAuditLog.create({
            data: {
                action: 'CONSULTANT_INVITED',
                details: {
                    consultantEmail: email,
                    permissions: permissions || 'VIEW_ONLY',
                    expiresAt: expiresAt?.toISOString() || 'Never'
                },
                userId: user.id,
                companyId: user.companyId,
            }
        })

        // In a real app, send email with access link here
        const accessLink = `/payroll/consultant?token=${accessToken}`

        return NextResponse.json({
            consultant: {
                id: consultant.id,
                email: consultant.email,
                name: consultant.name,
                permissions: consultant.permissions,
                status: consultant.status,
                expiresAt: consultant.expiresAt,
            },
            accessLink,
            message: `Consultant invited successfully. Share this link: ${accessLink}`
        })

    } catch (error) {
        console.error('Error inviting consultant:', error)
        return NextResponse.json({ error: 'Failed to invite consultant' }, { status: 500 })
    }
}

// DELETE revoke consultant access
export async function DELETE(request: NextRequest) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Only OWNER/ADMIN can revoke
        if (!['OWNER', 'ADMIN'].includes(user.role)) {
            return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
        }

        const { searchParams } = new URL(request.url)
        const consultantId = searchParams.get('id')

        if (!consultantId) {
            return NextResponse.json({ error: 'Consultant ID is required' }, { status: 400 })
        }

        const consultant = await prisma.payrollConsultant.update({
            where: { id: consultantId },
            data: { status: 'REVOKED' }
        })

        // Log the action
        await prisma.payrollAuditLog.create({
            data: {
                action: 'CONSULTANT_REVOKED',
                details: { consultantEmail: consultant.email },
                userId: user.id,
                companyId: user.companyId,
            }
        })

        return NextResponse.json({ message: 'Consultant access revoked' })

    } catch (error) {
        console.error('Error revoking consultant:', error)
        return NextResponse.json({ error: 'Failed to revoke access' }, { status: 500 })
    }
}
