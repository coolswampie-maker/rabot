import 'server-only';
import { cookies } from 'next/headers';
import { timingSafeEqual } from 'crypto';

// Lightweight access control for the standalone leads viewer (/leads).
//
// This is intentionally NOT the full admin auth (users, passwords, JWT). The
// handover deployment exposes lead collection only: whoever holds the secret
// token can view submissions, either via a link (/leads/auth?token=…) or by
// entering the token once. The token lives in the LEADS_TOKEN env var.

const COOKIE = 'leads_token';
export const LEADS_COOKIE = COOKIE;
export const LEADS_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function leadsToken(): string | null {
  const t = process.env.LEADS_TOKEN;
  return t && t.length >= 8 ? t : null; // require a non-trivial token
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export function tokenValid(candidate: string | undefined | null): boolean {
  const expected = leadsToken();
  if (!expected || !candidate) return false;
  return safeEqual(candidate, expected);
}

/** True when the current request carries a valid leads-session cookie. */
export function isLeadsAuthorized(): boolean {
  return tokenValid(cookies().get(COOKIE)?.value);
}

/** Set the leads-session cookie (call only from a Server Action / Route Handler). */
export function grantLeadsCookie(): void {
  const expected = leadsToken();
  if (!expected) return;
  cookies().set(COOKIE, expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/leads',
    maxAge: LEADS_MAX_AGE,
  });
}

export function clearLeadsCookie(): void {
  cookies().delete(COOKIE);
}
