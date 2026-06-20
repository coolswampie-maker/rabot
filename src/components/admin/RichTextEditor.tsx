'use client';

import { useRef, useState } from 'react';
import { renderMarkdown } from '@/lib/markdown';

// Markdown editor with a live, sanitized preview and a small formatting
// toolbar. Markdown keeps stored content safe and portable; preview uses the
// same sanitizer as the public site.
export default function RichTextEditor({
  name,
  defaultValue = '',
  onUploaded,
}: {
  name: string;
  defaultValue?: string;
  onUploaded?: (url: string) => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [tab, setTab] = useState<'write' | 'preview'>('write');
  const [uploading, setUploading] = useState(false);

  function wrap(before: string, after = before) {
    const el = ref.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e } = el;
    const sel = value.slice(s, e) || 'текст';
    const next = value.slice(0, s) + before + sel + after + value.slice(e);
    setValue(next);
    requestAnimationFrame(() => {
      el.focus();
      el.selectionStart = s + before.length;
      el.selectionEnd = s + before.length + sel.length;
    });
  }

  function prefixLine(prefix: string) {
    const el = ref.current;
    if (!el) return;
    const s = el.selectionStart;
    const lineStart = value.lastIndexOf('\n', s - 1) + 1;
    setValue(value.slice(0, lineStart) + prefix + value.slice(lineStart));
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/media/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (res.ok && json.url) {
        setValue((v) => `${v}\n\n![](${json.url})\n`);
        onUploaded?.(json.url);
      } else {
        alert(json.error || 'Не удалось загрузить файл');
      }
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  const btn = 'rounded px-2 py-1 text-sm font-medium text-navy-700 hover:bg-paper';

  return (
    <div className="rounded-xl border border-line bg-white">
      <div className="flex flex-wrap items-center gap-1 border-b border-line p-2">
        <button type="button" className={btn} onClick={() => wrap('**')}><b>B</b></button>
        <button type="button" className={`${btn} italic`} onClick={() => wrap('_')}>I</button>
        <button type="button" className={btn} onClick={() => prefixLine('## ')}>H2</button>
        <button type="button" className={btn} onClick={() => prefixLine('### ')}>H3</button>
        <button type="button" className={btn} onClick={() => prefixLine('- ')}>• List</button>
        <button type="button" className={btn} onClick={() => wrap('[', '](https://)')}>Link</button>
        <label className={`${btn} cursor-pointer`}>
          {uploading ? '…' : '🖼 Image/PDF'}
          <input type="file" accept="image/*,application/pdf" onChange={onFile} className="hidden" />
        </label>
        <div className="ml-auto flex gap-1">
          <button type="button" onClick={() => setTab('write')} className={`${btn} ${tab === 'write' ? 'bg-brand-50 text-brand-700' : ''}`}>Текст</button>
          <button type="button" onClick={() => setTab('preview')} className={`${btn} ${tab === 'preview' ? 'bg-brand-50 text-brand-700' : ''}`}>Превью</button>
        </div>
      </div>

      {tab === 'write' ? (
        <textarea
          ref={ref}
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={18}
          className="w-full resize-y rounded-b-xl p-4 font-mono text-sm outline-none"
          placeholder="Текст в формате Markdown…"
        />
      ) : (
        <>
          <input type="hidden" name={name} value={value} />
          <div
            className="prose-rudn min-h-[18rem] p-4"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
          />
        </>
      )}
    </div>
  );
}
