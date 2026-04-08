import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Get the first company from the database
        const company = await prisma.company.findFirst({
            select: {
                id: true,
                name: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        if (!company) {
            return NextResponse.json(
                { error: 'No company found', companyId: null },
                { status: 404 }
            );
        }

        return NextResponse.json({
            companyId: company.id,
            companyName: company.name
        });

    } catch (error) {
        console.error('Error fetching first company:', error);
        return NextResponse.json(
            { error: 'Failed to fetch company' },
            { status: 500 }
        );
    }
}
