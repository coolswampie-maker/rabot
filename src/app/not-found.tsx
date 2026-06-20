import Link from 'next/link';

// Global 404 — kept locale-neutral (bilingual) since it can render outside a
// locale segment.
export default function NotFound() {
  return (
    <html lang="ru">
      <body style={{ fontFamily: 'system-ui, sans-serif' }}>
        <main
          style={{
            minHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
            color: '#1a2230',
          }}
        >
          <p style={{ fontSize: 14, letterSpacing: 2, textTransform: 'uppercase', color: '#417db7' }}>404</p>
          <h1 style={{ fontSize: 32, margin: '12px 0' }}>Страница не найдена · Page not found</h1>
          <p style={{ color: '#5b6577', maxWidth: 480 }}>
            Возможно, страница была перемещена. · The page may have been moved.
          </p>
          <p style={{ marginTop: 24 }}>
            <Link href="/ru" style={{ color: '#356596', fontWeight: 600 }}>
              На главную · Home
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
