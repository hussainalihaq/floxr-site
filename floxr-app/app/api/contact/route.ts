import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const { name, email, scope, budget } = await request.json();

    if (!name || !email || !scope) {
      return NextResponse.json(
        { error: 'Name, email, and project details are required' },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name: String(name).slice(0, 200),
        email: String(email).toLowerCase().slice(0, 320),
        budget: budget ? String(budget).slice(0, 100) : null,
        scope: String(scope).slice(0, 5000),
      },
    });

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { error: 'Could not send your message right now. Please email hello@floxr.co instead.' },
      { status: 500 }
    );
  }
}
