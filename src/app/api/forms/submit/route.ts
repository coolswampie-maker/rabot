import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { submissionSchema } from '@/lib/validation';
import { rateLimit, hashIp, clientIp } from '@/lib/rate-limit';
import { toDbLocale } from '@/i18n/config';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const ip = clientIp(req.headers);

  // Rate limit: 5 submissions / minute / IP.
  if (!rateLimit(`form:${ip}`, 5, 60_000)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    const consentIssue = parsed.error.issues.find((i) => i.message === 'consent_required');
    return NextResponse.json(
      { error: consentIssue ? 'consent_required' : 'validation_error', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot: if filled, silently accept (pretend success) without storing.
  if (data.company_website) {
    return NextResponse.json({ ok: true });
  }

  // Belt-and-suspenders: never store a submission without data consent.
  if (data.consentData !== true) {
    return NextResponse.json({ error: 'consent_required' }, { status: 400 });
  }

  try {
    await prisma.submission.create({
      data: {
        kind: data.kind,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        organization: data.organization || null,
        interest: data.interest || null,
        message: data.message || null,
        consentData: true,
        consentMarketing: Boolean(data.consentMarketing),
        locale: toDbLocale(data.locale),
        sourcePath: data.sourcePath || null,
        ipHash: hashIp(ip),
      },
    });
  } catch (e) {
    console.error('[forms] save error:', (e as Error).message);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }

  // TODO(production): notify staff by email / forward to CRM here.
  return NextResponse.json({ ok: true });
}
