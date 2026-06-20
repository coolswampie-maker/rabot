import Image from 'next/image';

export type FacultyCardData = {
  slug: string;
  name: string;
  title: string;
  bio: string;
  field?: string | null;
  photo?: string | null;
};

function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();
}

export default function FacultyCard({ person }: { person: FacultyCardData }) {
  return (
    <article className="card flex flex-col p-5">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-brand-100">
          {person.photo ? (
            <Image src={person.photo} alt={person.name} fill sizes="64px" className="object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-lg font-semibold text-brand-600">
              {initials(person.name)}
            </span>
          )}
        </div>
        <div>
          <h3 className="text-base leading-tight">{person.name}</h3>
          <p className="mt-0.5 text-sm text-brand-600">{person.title}</p>
        </div>
      </div>
      {person.field && <p className="mt-3 text-xs font-medium uppercase tracking-wide text-muted">{person.field}</p>}
      <p className="mt-2 line-clamp-4 text-sm text-muted">{person.bio}</p>
    </article>
  );
}
