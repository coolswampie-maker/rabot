import { renderMarkdown } from '@/lib/markdown';

// Renders sanitized markdown. Input is sanitized in renderMarkdown (DOMPurify),
// so dangerouslySetInnerHTML is safe here.
export default function Prose({ markdown, className = '' }: { markdown: string; className?: string }) {
  return (
    <div
      className={`prose-rudn ${className}`}
      dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
    />
  );
}
