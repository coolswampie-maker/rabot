import Link from 'next/link';

export default function CTASection({
  title,
  text,
  cta,
}: {
  title: string;
  text: string;
  cta: { label: string; href: string };
  image?: string;
}) {
  return (
    <section className="py-12 lg:py-16">
      <div className="container">
        <div className="flex flex-col items-center gap-6 rounded-[1.5rem] bg-brand-500 px-8 py-10 text-center sm:flex-row sm:justify-between sm:px-12 sm:py-12 sm:text-left">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
            <p className="mt-2 max-w-xl text-white/85">{text}</p>
          </div>
          <Link href={cta.href} className="btn-on-dark shrink-0">
            {cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
