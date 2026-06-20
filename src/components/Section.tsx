import Link from 'next/link';

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  link,
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  link?: { label: string; href: string };
  align?: 'left' | 'center';
}) {
  if (align === 'center') {
    return (
      <div className="mb-8 flex flex-col items-center text-center">
        {eyebrow && (
          <p className="eyebrow mb-3 flex items-center gap-2.5">
            <span className="h-px w-6 bg-accent-500/60" />
            {eyebrow}
            <span className="h-px w-6 bg-accent-500/60" />
          </p>
        )}
        <h2 className="max-w-3xl font-serif text-3xl sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-muted">{subtitle}</p>}
        {link && (
          <Link href={link.href} className="mt-6 text-sm font-semibold text-brand-600 hover:text-brand-700">
            {link.label} →
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="font-serif text-3xl sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-3 text-lg text-muted">{subtitle}</p>}
      </div>
      {link && (
        <Link href={link.href} className="shrink-0 text-sm font-semibold text-brand-600 hover:text-brand-700">
          {link.label} →
        </Link>
      )}
    </div>
  );
}
