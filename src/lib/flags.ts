import 'server-only';

// Feature flags resolved from environment variables.
//
// The professional content-management admin (the CMS at /admin) is OFF by
// default. The handover ("Этап 1") deployment runs without it — visitors get
// the public site plus working lead collection, and leads are viewed on the
// token-protected /leads page. Set ENABLE_CMS=1 only on the internal build
// where the full editor is wanted.
export function cmsEnabled(): boolean {
  return process.env.ENABLE_CMS === '1';
}
