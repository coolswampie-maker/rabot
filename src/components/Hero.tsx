import Link from 'next/link';
import Image from 'next/image';

export default function Hero({
  kicker,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  image = '/images/rudn/hero-interior.jpg',
}: {
  kicker: string;
  title: string;
  subtitle: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  stats?: { value: string; label: string }[];
  image?: string;
}) {
  return (
    <section className="relative isolate flex min-h-[54vh] items-center overflow-hidden">
      {/* Large, softly-blurred background image */}
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="scale-105 object-cover object-center blur-[2px]"
      />
      {/* Refined brand-toned scrim for depth + legibility (not flat black) */}
      <div className="absolute inset-0 bg-[#122340]/72" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0e1c33]/85 via-[#13233f]/45 to-[#2c5078]/30" />
      {/* Soft fade into the white page below */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />

      <div className="container relative py-16 text-center lg:py-20">
        <p className="mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.34em] text-white/85">
          <span className="h-px w-10 bg-white/50" />
          {kicker}
          <span className="h-px w-10 bg-white/50" />
        </p>
        <h1 className="mx-auto max-w-4xl text-[2.3rem] font-bold leading-[1.08] text-white drop-shadow-[0_2px_30px_rgba(8,16,30,0.55)] sm:text-5xl lg:text-[3.5rem]">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 drop-shadow-[0_1px_16px_rgba(8,16,30,0.5)] sm:text-lg">
          {subtitle}
        </p>

        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {primaryCta && (
              <Link href={primaryCta.href} className="btn-on-dark">
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link href={secondaryCta.href} className="btn-light">
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
