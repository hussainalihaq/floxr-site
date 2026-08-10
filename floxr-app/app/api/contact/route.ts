import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let pending: { name: string; email: string; budget: string | null; scope: string } | null = null;
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

    pending = {
      name: String(name).slice(0, 200),
      email: String(email).toLowerCase().slice(0, 320),
      budget: budget ? String(budget).slice(0, 100) : null,
      scope: String(scope).slice(0, 5000),
    };

    const submission = await prisma.contactSubmission.create({ data: pending });

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
  } catch (error) {
    // The database can be unreachable (paused project, missing DATABASE_URL).
    // Log the whole submission so the lead is recoverable from the platform
    // logs rather than lost, then tell the client to use the email fallback.
    console.error('[contact] persist failed — submission follows', {
      error: error instanceof Error ? error.message : String(error),
      submission: pending,
      at: new Date().toISOString(),
    });
    return NextResponse.json(
      { error: 'We could not save that just now.' },
      { status: 503 }
    );
  }
}
