/** @type {import('next').NextConfig} */

// STATIC_EXPORT=1 produces a fully static site (no server/DB/admin) in ./out —
// for hosting on Cloudflare Pages / GitHub Pages for review. Otherwise we build
// a normal server app (standalone) for Railway/Render/etc.
const STATIC = process.env.STATIC_EXPORT === '1';

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: STATIC ? 'export' : 'standalone',
  trailingSlash: STATIC ? true : false,
  images: STATIC
    ? { unoptimized: true }
    : { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
};

// Custom headers only apply to the server build (ignored by static export).
if (!STATIC) {
  nextConfig.headers = async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
  ];
}

export default nextConfig;
