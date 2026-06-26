import { NextResponse } from 'next/server';
import { tokenValid, leadsToken, LEADS_COOKIE, LEADS_MAX_AGE } from '@/lib/leads';

export const runtime = 'nodejs';

// Link-based login: /leads/auth?token=SECRET sets the session cookie and
// redirects to /leads. Lets staff bookmark a single link instead of typing
// the token each time.
export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get('token');
  if (!tokenValid(token)) {
    return NextResponse.redirect(new URL('/leads?e=1', req.url));
  }
  const res = NextResponse.redirect(new URL('/leads', req.url));
  res.cookies.set(LEADS_COOKIE, leadsToken()!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/leads',
    maxAge: LEADS_MAX_AGE,
  });
  return res;
}
