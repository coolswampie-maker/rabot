'use client';

import { useEffect } from 'react';

// Root redirect to the default locale. In the dynamic app, middleware already
// redirects "/" → "/ru" before this renders; this exists so the STATIC export
// (no middleware) still sends the root to /ru/.
export default function RootRedirect() {
  useEffect(() => {
    window.location.replace('/ru/');
  }, []);
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', display: 'flex', minHeight: '60vh', alignItems: 'center', justifyContent: 'center' }}>
      <a href="/ru/" style={{ color: '#356596', fontWeight: 600 }}>
        RUDN Business School →
      </a>
    </div>
  );
}
