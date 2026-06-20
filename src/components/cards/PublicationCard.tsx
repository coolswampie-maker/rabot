import Link from 'next/link';

export type PublicationCardData = {
  slug: string;
  title: string;
  authorsText: string;
  year: number;
  venue?: string | null;
  typeLabel: string;
};

export default function PublicationCard({
  item,
  href,
}: {
  item: PublicationCardData;
  href: string;
}) {
  return (
    <article className="card-hover relative flex flex-col p-5">
      <div className="mb-2 flex items-center gap-2 text-xs">
        <span className="chip">{item.typeLabel}</span>
        <span className="font-medium text-muted">{item.year}</span>
      </div>
      <h3 className="text-base leading-snug">
        <Link href={href} className="after:absolute after:inset-0 hover:text-brand-700">
          {item.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-muted">{item.authorsText}</p>
      {item.venue && <p className="mt-1 text-sm italic text-muted/80">{item.venue}</p>}
    </article>
  );
}
