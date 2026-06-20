// Brand / subdomain architecture.
//
// In production each brand can live on its own subdomain:
//   main:        <domain>            -> MBA / Business School hub
//   accelerator: accelerator.<domain>-> Accelerator section
//   research:    research.<domain>   -> ICEMR research center
//
// In local development subdomains are inconvenient, so the same content is
// reachable via path-based routes: /accelerator and /research.
// `middleware.ts` rewrites subdomain hosts onto these routes so one codebase
// serves all three. See README "Domains & subdomains".

export type BrandKey = 'mba' | 'accelerator' | 'research';

export const brandRoutes: Record<Exclude<BrandKey, 'mba'>, string> = {
  accelerator: '/accelerator',
  research: '/research',
};

export function acceleratorHost(): string | undefined {
  return process.env.NEXT_PUBLIC_ACCELERATOR_HOST;
}

export function researchHost(): string | undefined {
  return process.env.NEXT_PUBLIC_RESEARCH_HOST;
}
