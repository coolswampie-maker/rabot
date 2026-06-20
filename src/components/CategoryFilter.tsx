import Link from 'next/link';

export type FilterOption = { label: string; href: string; active: boolean };

// Link-based filter (SEO-friendly, works without JS). Each option is a real URL.
export default function CategoryFilter({ options }: { options: FilterOption[] }) {
  return (
    <div className="flex flex-wrap gap-2" role="navigation" aria-label="Filter">
      {options.map((o) => (
        <Link
          key={o.href}
          href={o.href}
          aria-current={o.active ? 'true' : undefined}
          className={
            o.active
              ? 'rounded-full bg-brand-500 px-4 py-1.5 text-sm font-medium text-white'
              : 'rounded-full border border-line bg-white px-4 py-1.5 text-sm font-medium text-navy-700 hover:border-brand-200 hover:text-brand-600'
          }
        >
          {o.label}
        </Link>
      ))}
    </div>
  );
}
