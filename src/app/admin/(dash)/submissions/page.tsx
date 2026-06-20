import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const KIND_LABEL: Record<string, string> = {
  PROGRAM_APPLICATION: 'Заявка на программу',
  ACCELERATOR_APPLICATION: 'Заявка в акселератор',
  CONTACT: 'Обратная связь',
  SUBSCRIPTION: 'Подписка',
};

async function setStatus(formData: FormData) {
  'use server';
  await requireSession();
  const id = String(formData.get('id'));
  const status = String(formData.get('status')) as
    | 'NEW' | 'IN_PROGRESS' | 'CONTACTED' | 'CLOSED' | 'SPAM';
  await prisma.submission.update({ where: { id }, data: { status } });
  revalidatePath('/admin/submissions');
}

export default async function Submissions() {
  const items = await prisma.submission.findMany({ orderBy: { createdAt: 'desc' }, take: 200 }).catch(() => []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-navy-700">Заявки с форм</h1>
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
                  <p className="mt-2 font-medium text-navy-700">{s.name}</p>
                  <p className="text-sm text-muted">
                    <a href={`mailto:${s.email}`} className="text-brand-600 hover:underline">{s.email}</a>
                    {s.phone && <> · {s.phone}</>}
                    {s.organization && <> · {s.organization}</>}
                  </p>
                  {s.interest && <p className="mt-1 text-sm text-navy-700">Интерес: {s.interest}</p>}
                  {s.message && <p className="mt-2 max-w-2xl whitespace-pre-wrap text-sm text-muted">{s.message}</p>}
                  <p className="mt-2 text-xs text-muted">
                    Согласие на обработку ПДн: {s.consentData ? '✓' : '—'} · Рассылка: {s.consentMarketing ? '✓' : '—'}
                  </p>
                </div>
                <form action={setStatus} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={s.id} />
                  <select name="status" defaultValue={s.status} className="rounded-lg border border-line px-2 py-1 text-xs">
                    <option value="NEW">Новая</option>
                    <option value="IN_PROGRESS">В работе</option>
                    <option value="CONTACTED">Связались</option>
                    <option value="CLOSED">Закрыта</option>
                    <option value="SPAM">Спам</option>
                  </select>
                  <button className="btn-secondary px-3 py-1 text-xs">OK</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
