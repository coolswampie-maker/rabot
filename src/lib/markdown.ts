import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

marked.setOptions({ gfm: true, breaks: false });

// sanitize-html is pure-JS (no jsdom), so it runs cleanly in both server
// components and the client editor preview.
const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags,
    'h1',
    'h2',
    'img',
    'figure',
    'figcaption',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel', 'title'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
    '*': ['class'],
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  transformTags: {
    // Make external links safe.
    a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }),
  },
};

// Render markdown -> sanitized HTML. Defends against XSS from the editor.
export function renderMarkdown(md: string): string {
  const raw = marked.parse(md ?? '', { async: false }) as string;
  return sanitizeHtml(raw, SANITIZE_OPTIONS);
}

// Plain-text excerpt for meta descriptions / previews.
export function toPlainText(md: string, max = 200): string {
  const text = (md ?? '')
    .replace(/[#>*_`~\-]/g, ' ')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > max ? text.slice(0, max).trimEnd() + '…' : text;
}
