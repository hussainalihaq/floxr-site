import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, objective } = await request.json();

    if (!firstName || !lastName || !email || !objective) {
      return NextResponse.json(
        { error: 'First name, last name, email, and objective are required' },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const submission = await prisma.auditSubmission.create({
      data: {
        firstName: String(firstName).slice(0, 200),
        lastName: String(lastName).slice(0, 200),
        email: String(email).toLowerCase().slice(0, 320),
        objective: String(objective).slice(0, 500),
      },
    });

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
  } catch (error) {
    console.error('Audit submission error:', error);
    return NextResponse.json(
      { error: 'Could not save your request right now. Please email hello@floxr.co instead.' },
      { status: 500 }
    );
  }
}
