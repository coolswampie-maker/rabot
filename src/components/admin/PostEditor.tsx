'use client';

import { useState } from 'react';
import RichTextEditor from './RichTextEditor';
import { savePost } from '@/app/admin/(dash)/posts/actions';

type Category = { id: string; nameRu: string };

export type PostEditorData = {
  id?: string;
  title?: string;
  slug?: string;
  locale?: string;
  type?: string;
  brand?: string;
  status?: string;
  featured?: boolean;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  categoryId?: string;
  authorName?: string;
  seoTitle?: string;
  seoDescription?: string;
};

const field = 'w-full rounded-xl border border-line px-3 py-2 text-sm outline-none focus:border-brand-400';
const labelCls = 'mb-1 block text-sm font-medium text-navy-700';

function CoverUploader({ defaultUrl }: { defaultUrl?: string }) {
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
      <span className={labelCls}>Обложка</span>
      <input type="hidden" name="coverImage" value={url} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {url && <img src={url} alt="" className="mb-2 h-32 w-full rounded-xl object-cover" />}
      <label className="btn-secondary cursor-pointer text-xs">
        {busy ? '…' : url ? 'Заменить' : 'Загрузить'}
        <input type="file" accept="image/*" onChange={upload} className="hidden" />
      </label>
      {url && (
        <button type="button" onClick={() => setUrl('')} className="ml-2 text-xs text-muted hover:text-red-600">
          Убрать
        </button>
      )}
    </div>
  );
}

export default function PostEditor({
  data = {},
  categories,
}: {
  data?: PostEditorData;
  categories: Category[];
}) {
  return (
    <form action={savePost} className="grid gap-6 lg:grid-cols-[1fr_300px]">
      {data.id && <input type="hidden" name="id" value={data.id} />}

      <div className="space-y-5">
        <div>
          <label className={labelCls}>Заголовок *</label>
          <input name="title" defaultValue={data.title} required className={field} />
        </div>
        <div>
          <label className={labelCls}>Краткое описание (excerpt)</label>
          <textarea name="excerpt" defaultValue={data.excerpt} rows={2} className={field} />
        </div>
        <div>
          <label className={labelCls}>Текст материала</label>
          <RichTextEditor name="content" defaultValue={data.content || ''} />
        </div>

        <details className="rounded-xl border border-line bg-white p-4">
          <summary className="cursor-pointer text-sm font-medium text-navy-700">SEO</summary>
          <div className="mt-4 space-y-4">
            <div>
              <label className={labelCls}>SEO title</label>
              <input name="seoTitle" defaultValue={data.seoTitle} className={field} />
            </div>
            <div>
              <label className={labelCls}>SEO description</label>
              <textarea name="seoDescription" defaultValue={data.seoDescription} rows={2} className={field} />
            </div>
            <div>
              <label className={labelCls}>Slug (ЧПУ)</label>
              <input name="slug" defaultValue={data.slug} placeholder="генерируется из заголовка" className={field} />
            </div>
          </div>
        </details>
      </div>

      <aside className="space-y-5">
        <div className="card space-y-4 p-5">
          <div>
            <label className={labelCls}>Статус</label>
            <select name="status" defaultValue={data.status || 'DRAFT'} className={field}>
              <option value="DRAFT">Черновик</option>
              <option value="PUBLISHED">Опубликовано</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Тип</label>
            <select name="type" defaultValue={data.type || 'NEWS'} className={field}>
              <option value="NEWS">Новость</option>
              <option value="ARTICLE">Статья</option>
              <option value="EVENT">Событие</option>
              <option value="EXPERT_COMMENT">Экспертное мнение</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Язык</label>
            <select name="locale" defaultValue={data.locale || 'RU'} className={field}>
              <option value="RU">Русский</option>
              <option value="EN">English</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Раздел</label>
            <select name="brand" defaultValue={data.brand || 'MBA'} className={field}>
              <option value="MBA">MBA</option>
              <option value="ACCELERATOR">Акселератор</option>
              <option value="ICEMR">ICEMR</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Категория</label>
            <select name="categoryId" defaultValue={data.categoryId || ''} className={field}>
              <option value="">— без категории —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.nameRu}</option>
              ))}
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm text-navy-700">
            <input type="checkbox" name="featured" defaultChecked={data.featured} className="h-4 w-4 accent-brand-500" />
            Избранное (featured)
          </label>
          <div>
            <label className={labelCls}>Автор</label>
            <input name="authorName" defaultValue={data.authorName} className={field} />
          </div>
        </div>

        <div className="card p-5">
          <CoverUploader defaultUrl={data.coverImage} />
        </div>

        <button type="submit" className="btn-primary w-full">Сохранить</button>
      </aside>
    </form>
  );
}
