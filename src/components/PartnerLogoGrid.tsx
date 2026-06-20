import Image from 'next/image';

export type PartnerItem = {
  id: string;
  name: string;
  slug?: string;
  url?: string | null;
  logo?: string | null;
};

const LOGOS: Record<string, string> = {
  'russian-railways': '/images/partners/rzd.png',
  sber: '/images/partners/sber.png',
  gazprom: '/images/partners/gazprom.png',
  iidf: '/images/partners/iidf.png',
  rostelecom: '/images/partners/rostelecom.png',
  severstal: '/images/partners/severstal.png',
};

function logoFor(partner: PartnerItem): string | null {
  return partner.logo || (partner.slug ? LOGOS[partner.slug] : null) || null;
}

export default function PartnerLogoGrid({ partners }: { partners: PartnerItem[] }) {
  // Use a column count that divides the item count where possible so the last
  // row is never left lonely (e.g. 6 items -> 3 columns = 3 + 3).
  const cols = partners.length % 3 === 0 ? 'md:grid-cols-3' : partners.length % 4 === 0 ? 'md:grid-cols-4' : 'md:grid-cols-3';
  return (
    <ul className={`mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 ${cols}`}>
      {partners.map((p) => {
        const logo = logoFor(p);
        const inner = (
          <span className="flex h-24 items-center justify-center rounded-lg border border-line bg-white px-6 text-center text-sm font-semibold text-navy-700 shadow-[0_1px_2px_rgba(16,24,40,.04)] transition hover:border-navy-900">
            {logo ? (
              <Image src={logo} alt={p.name} width={220} height={72} className="max-h-12 w-auto max-w-full object-contain" />
            ) : (
              p.name
            )}
          </span>
        );
        return (
          <li key={p.id}>
            {p.url ? (
              <a href={p.url} target="_blank" rel="noopener noreferrer">
                {inner}
              </a>
            ) : (
              inner
            )}
          </li>
        );
      })}
    </ul>
  );
}
