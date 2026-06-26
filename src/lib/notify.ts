import 'server-only';
import type { Submission } from '@prisma/client';

// Email notification for new form submissions.
//
// Configured entirely through env vars (SMTP_* + LEADS_NOTIFY_EMAIL). If SMTP
// is not configured, this is a silent no-op, so the app runs fine without it.
// A failure to send NEVER blocks saving the lead — callers ignore rejections.

const KIND_LABEL: Record<string, string> = {
  PROGRAM_APPLICATION: 'Заявка на программу',
  ACCELERATOR_APPLICATION: 'Заявка в акселератор',
  CONTACT: 'Обратная связь',
  SUBSCRIPTION: 'Подписка',
};

export async function notifyNewSubmission(s: Submission): Promise<void> {
  const to = process.env.LEADS_NOTIFY_EMAIL;
  const host = process.env.SMTP_HOST;
  if (!to || !host) return; // not configured — skip

  try {
    const nodemailer = (await import('nodemailer')).default;
    const transport = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === '1', // true for port 465
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    });

    const kind = KIND_LABEL[s.kind] ?? s.kind;
    const rows: [string, string | null | undefined][] = [
      ['Тип', kind],
      ['Имя', s.name],
      ['Email', s.email],
      ['Телефон', s.phone],
      ['Организация', s.organization],
      ['Интерес', s.interest],
      ['Сообщение', s.message],
      ['Согласие на рассылку', s.consentMarketing ? 'да' : 'нет'],
      ['Страница', s.sourcePath],
      ['Когда', new Date(s.createdAt).toLocaleString('ru-RU')],
    ];
    const text = rows
      .filter(([, v]) => v != null && v !== '')
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n');

    await transport.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER || to,
      to,
      replyTo: s.email,
      subject: `Новая заявка с сайта: ${kind} — ${s.name || s.email}`,
      text,
    });
  } catch (e) {
    console.error('[notify] email failed:', (e as Error).message);
  }
}
