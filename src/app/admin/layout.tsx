import { notFound } from 'next/navigation';
import { cmsEnabled } from '@/lib/flags';

export const dynamic = 'force-dynamic';

// Gate the entire /admin segment (login + dashboard) behind the CMS flag.
// In the handover deployment ENABLE_CMS is unset, so the professional editor
// is not exposed at all — every /admin route returns 404.
export default function AdminSegmentLayout({ children }: { children: React.ReactNode }) {
  if (!cmsEnabled()) notFound();
  return <>{children}</>;
}
