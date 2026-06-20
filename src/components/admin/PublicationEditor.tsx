'use client';

import { useState } from 'react';
import { savePublication } from '@/app/admin/(dash)/publications/actions';

const field = 'w-full rounded-xl border border-line px-3 py-2 text-sm outline-none focus:border-brand-400';
const labelCls = 'mb-1 block text-sm font-medium text-navy-700';

export type PublicationEditorData = {
  id?: string;
  title?: string;
  slug?: string;
  locale?: string;
  type?: string;
  status?: string;
  featured?: boolean;
  abstract?: string;
  authorsText?: string;
  year?: number;
  venue?: string;
  field?: string;
  doi?: string;
  fileUrl?: string;
  externalUrl?: string;
};

function PdfUploader({ defaultUrl }: { defaultUrl?: string }) {
  const [url, setUrl] = useState(defaultUrl || '');
  const [busy, setBusy] = useState(false);
  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/media/upload', { method: 'POST', body: fd });
    const json = await res.json();
    setBusy(false);
    if (res.ok) setUrl(json.url);
    else alert(json.error || 'Ошибка загрузки');
  }
  return (
    <div>
      <span className={labelCls}>PDF файл</span>
      <input type="hidden" name="fileUrl" value={url} />
      {url && <p className="mb-2 truncate text-xs text-brand-600">{url}</p>}
      <label className="btn-secondary cursor-pointer text-xs">
        {busy ? '…' : url ? 'Заменить PDF' : 'Загрузить PDF'}
        <input type="file" accept="application/pdf" onChange={upload} className="hidden" />
      </label>
    </div>
  );
}

export default function PublicationEditor({ data = {} }: { data?: PublicationEditorData }) {
  return (
    <form action={savePublication} className="grid gap-6 lg:grid-cols-[1fr_300px]">
      {data.id && <input type="hidden" name="id" value={data.id} />}
      <div className="space-y-5">
        <div>
          <label className={labelCls}>Название *</label>
          <input name="title" defaultValue={data.title} required className={field} />
        </div>
        <div>
          <label className={labelCls}>Авторы (через запятую)</label>
          <input name="authorsText" defaultValue={data.authorsText} placeholder="Иванов А., Smith J." className={field} />
        </div>
        <div>
          <label className={labelCls}>Аннотация</label>
          <textarea name="abstract" defaultValue={data.abstract} rows={6} className={field} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Издание / серия</label>
            <input name="venue" defaultValue={data.venue} className={field} />
          </div>
          <div>
            <label className={labelCls}>Направление</label>
            <input name="field" defaultValue={data.field} className={field} />
          </div>
          <div>
            <label className={labelCls}>DOI</label>
            <input name="doi" defaultValue={data.doi} className={field} />
          </div>
          <div>
            <label className={labelCls}>Внешняя ссылка</label>
            <input name="externalUrl" defaultValue={data.externalUrl} className={field} />
          </div>
        </div>
      </div>

      <aside className="space-y-5">
        <div className="card space-y-4 p-5">
          <div>
            <label className={labelCls}>Статус</label>
            <select name="status" defaultValue={data.status || 'PUBLISHED'} className={field}>
              <option value="PUBLISHED">Опубликовано</option>
              <option value="DRAFT">Черновик</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Тип</label>
            <select name="type" defaultValue={data.type || 'JOURNAL_ARTICLE'} className={field}>
              <option value="WORKING_PAPER">Working paper</option>
              <option value="JOURNAL_ARTICLE">Статья в журнале</option>
              <option value="BOOK">Книга</option>
              <option value="REPORT">Отчёт</option>
              <option value="CONFERENCE_PAPER">Доклад</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Год</label>
            <input name="year" type="number" defaultValue={data.year ?? 2025} className={field} />
          </div>
          <div>
            <label className={labelCls}>Язык</label>
            <select name="locale" defaultValue={data.locale || 'EN'} className={field}>
              <option value="EN">English</option>
              <option value="RU">Русский</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm text-navy-700">
            <input type="checkbox" name="featured" defaultChecked={data.featured} className="h-4 w-4 accent-brand-500" />
            Избранное
          </label>
        </div>
        <div className="card p-5">
          <PdfUploader defaultUrl={data.fileUrl} />
        </div>
        <button type="submit" className="btn-primary w-full">Сохранить</button>
      </aside>
    </form>
  );
}
