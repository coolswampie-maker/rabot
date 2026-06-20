import Link from 'next/link';
import Image from 'next/image';

export type ProgramCardData = {
  slug: string;
  title: string;
  summary: string;
  format?: string | null;
  duration?: string | null;
};

// Deterministic image per program when no cover is set.
const IMAGES: Record<string, string> = {
  'mba-classic': '/images/lecture.jpg',
  'master-of-business-acceleration': '/images/team.jpg',
  'global-expansion': '/images/campus.jpg',
};
const POOL = ['/images/library.jpg', '/images/research.jpg', '/images/collab.jpg'];
function imageFor(slug: string): string {
  if (IMAGES[slug]) return IMAGES[slug];
  let n = 0;
  for (const c of slug) n = (n + c.charCodeAt(0)) % POOL.length;
  return POOL[n];
}

export default function ProgramCard({
  program,
  href,
  labels,
}: {
  program: ProgramCardData;
  href: string;
  labels: { format: string; duration: string; more: string };
}) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-card-hover">
      <Link href={href} className="flex flex-1 flex-col">
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image
            src={imageFor(program.slug)}
            alt=""
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/45 via-transparent to-transparent" />
          {program.duration && (
            <span className="absolute bottom-3 left-3 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
              {program.duration}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-bold leading-snug text-navy-700 transition group-hover:text-brand-600">
            {program.title}
          </h3>
          <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{program.summary}</p>
          {program.format && (
            <p className="mt-4 text-sm text-muted">
              <span className="text-muted/70">{labels.format}:</span>{' '}
              <span className="font-medium text-navy-700">{program.format}</span>
            </p>
          )}
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
            {labels.more}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
