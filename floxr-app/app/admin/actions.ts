'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createHash, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'floxr_admin';

function sessionToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHash('sha256').update(`floxr-admin:${password}`).digest('hex');
}

export async function isAdminAuthed(): Promise<boolean> {
  const token = sessionToken();
  if (!token) return false;
  const cookieValue = (await cookies()).get(COOKIE_NAME)?.value;
  if (!cookieValue || cookieValue.length !== token.length) return false;
  return timingSafeEqual(Buffer.from(cookieValue), Buffer.from(token));
}

export async function adminLogin(formData: FormData): Promise<void> {
  const password = process.env.ADMIN_PASSWORD;
  const attempt = formData.get('password');
  const token = sessionToken();

  if (
    token &&
    typeof attempt === 'string' &&
    password &&
    attempt.length === password.length &&
    timingSafeEqual(Buffer.from(attempt), Buffer.from(password))
  ) {
    (await cookies()).set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
    redirect('/admin');
  }

  redirect('/admin?error=1');
}

export async function adminLogout(): Promise<void> {
  (await cookies()).delete(COOKIE_NAME);
  redirect('/admin');
}
