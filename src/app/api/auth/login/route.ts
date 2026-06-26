import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { loginSchema } from '@/lib/validation';
import { verifyPassword, createSession } from '@/lib/auth';
import { rateLimit, clientIp } from '@/lib/rate-limit';
import { cmsEnabled } from '@/lib/flags';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  // Admin login is unavailable when the CMS is disabled (handover build).
  if (!cmsEnabled()) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  const ip = clientIp(req.headers);
  // Throttle brute force: 10 attempts / 5 min / IP.
  if (!rateLimit(`login:${ip}`, 10, 5 * 60_000)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  // Generic error message to avoid leaking which emails exist.
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return NextResponse.json({ error: 'invalid_credentials' }, { status: 401 });
  }

  await createSession({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  return NextResponse.json({ ok: true });
}
