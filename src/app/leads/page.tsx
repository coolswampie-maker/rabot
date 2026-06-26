import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import {
  isLeadsAuthorized,
  tokenValid,
  leadsToken,
  grantLeadsCookie,
  clearLeadsCookie,
} from '@/lib/leads';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Заявки', robots: { index: false, follow: false } };

const KIND_LABEL: Record<string, string> = {
  PROGRAM_APPLICATION: 'Заявка на программу',
  ACCELERATOR_APPLICATION: 'Заявка в акселератор',
  CONTACT: 'Обратная связь',
  SUBSCRIPTION: 'Подписка',
};

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: 'NEW', label: 'Новая' },
  { value: 'IN_PROGRESS', label: 'В работе' },
  { value: 'CONTACTED', label: 'Связались' },
  { value: 'CLOSED', label: 'Закрыта' },
  { value: 'SPAM', label: 'Спам' },
];

// ---- server actions ----------------------------------------------------------

async function login(formData: FormData) {
  'use server';
  const token = String(formData.get('token') || '');
  if (!tokenValid(token)) redirect('/leads?e=1');
  grantLeadsCookie();
  redirect('/leads');
}

async function logout() {
  'use server';
  clearLeadsCookie();
  redirect('/leads');
}

async function setStatus(formData: FormData) {
  'use server';
  if (!isLeadsAuthorized()) redirect('/leads');
  const id = String(formData.get('id'));
  const status = String(formData.get('status')) as
    | 'NEW' | 'IN_PROGRESS' | 'CONTACTED' | 'CLOSED' | 'SPAM';
  await prisma.submission.update({ where: { id }, data: { status } });
  redirect('/leads');
}

// ---- page --------------------------------------------------------------------

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: { e?: string };
}) {
  // Misconfiguration guard — make it obvious during setup.
  if (!leadsToken()) {
    return (
      <Shell>
        <div className="card p-7">
          <h1 className="text-xl font-semibold text-navy-700">Просмотр заявок не настроен</h1>
          <p className="mt-2 text-sm text-muted">
            Задайте переменную окружения <code>LEADS_TOKEN</code> (минимум 8 символов), затем
            откройте эту страницу по ссылке <code>/leads/auth?token=ВАШ_ТОКЕН</code> или введите токен ниже.
          </p>
        </div>
      </Shell>
    );
  }

  if (!isLeadsAuthorized()) {
    return (
      <Shell>
        <form action={login} className="card mx-auto max-w-sm space-y-4 p-7">
          <div>
            <h1 className="text-xl font-semibold text-navy-700">Заявки с сайта</h1>
            <p className="text-sm text-muted">Введите токен доступа</p>
          </div>
          <input
            name="token"
            type="password"
            required
            autoFocus
            placeholder="Токен"
            className="w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-brand-400"
          />
          {searchParams.e && (
            <p className="text-sm font-medium text-red-600">Неверный токен.</p>
          )}
          <button type="submit" className="btn-primary w-full">Войти</button>
        </form>
      </Shell>
    );
  }

  const items = await prisma.submission
    .findMany({ orderBy: { createdAt: 'desc' }, take: 500 })
    .catch(() => []);

  return (
    <Shell>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-navy-700">
          Заявки с сайта <span className="text-base font-normal text-muted">({items.length})</span>
        </h1>
        <form action={logout}>
          <button className="btn-secondary px-3 py-1.5 text-xs">Выйти</button>
        </form>
      </div>

      {items.length === 0 ? (
        <p className="text-muted">Заявок пока нет.</p>
      ) : (
        <div className="space-y-3">
          {items.map((s) => (
            <div key={s.id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="chip">{KIND_LABEL[s.kind] ?? s.kind}</span>
                    <span className="text-xs text-muted">
                      {new Date(s.createdAt).toLocaleString('ru-RU')}
                    </span>
                  </div>
                  {s.name && <p className="mt-2 font-medium text-navy-700">{s.name}</p>}
                  <p className="text-sm text-muted">
                    <a href={`mailto:${s.email}`} className="text-brand-600 hover:underline">{s.email}</a>
                    {s.phone && <> · <a href={`tel:${s.phone}`} className="text-brand-600 hover:underline">{s.phone}</a></>}
                    {s.organization && <> · {s.organization}</>}
                  </p>
                  {s.interest && <p className="mt-1 text-sm text-navy-700">Интерес: {s.interest}</p>}
                  {s.message && <p className="mt-2 max-w-2xl whitespace-pre-wrap text-sm text-muted">{s.message}</p>}
                  <p className="mt-2 text-xs text-muted">
                    Согласие на обработку ПДн: {s.consentData ? '✓' : '—'} · Рассылка: {s.consentMarketing ? '✓' : '—'}
                    {s.sourcePath && <> · {s.sourcePath}</>}
                  </p>
                </div>
                <form action={setStatus} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={s.id} />
                  <select
                    name="status"
                    defaultValue={s.status}
                    className="rounded-lg border border-line px-2 py-1 text-xs"
                  >
                    {STATUS_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <button className="btn-secondary px-3 py-1 text-xs">OK</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto max-w-4xl px-4 py-10">{children}</div>
    </div>
  );
}
