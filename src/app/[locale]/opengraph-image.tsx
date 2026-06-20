import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'RUDN Business School';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Generated default Open Graph image, applied to all localized pages that don't
// set their own image. No raster asset needs to live in the repo.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          backgroundColor: '#417db7',
          backgroundImage:
            'radial-gradient(70% 80% at 12% 8%, rgba(255,255,255,0.18) 0%, transparent 60%), radial-gradient(60% 70% at 92% 18%, rgba(255,255,255,0.12) 0%, transparent 55%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 2, color: '#aecde9', textTransform: 'uppercase' }}>
          RUDN Business School
        </div>
        <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
          MBA · Accelerator · ICEMR Research Center
        </div>
        <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.7)' }}>
          Business education with the reach of an international university
        </div>
      </div>
    ),
    { ...size },
  );
}
