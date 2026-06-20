'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const NAV = [
  { href: '/admin', label: 'Дашборд', exact: true },
  { href: '/admin/posts', label: 'Новости и статьи' },
  { href: '/admin/publications', label: 'Публикации' },
  { href: '/admin/submissions', label: 'Заявки' },
];

export default function AdminShell({
  user,
  children,
}: {
  user: { name: string; email: string; role: string };
  children: React.ReactNode;
}) {
  const pathname = usePathname() || '';
  const router = useRouter();

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-paper">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-white md:flex">
        <div className="border-b border-line p-5">
          <Image src="/logo.svg" alt="RUDN" width={120} height={40} className="h-8 w-auto" />
          <p className="mt-1 text-xs text-muted">CMS</p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((n) => {
            const active = n.exact ? pathname === n.href : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                  active ? 'bg-brand-50 text-brand-700' : 'text-navy-700 hover:bg-paper'
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-line p-4">
          <p className="truncate text-sm font-medium text-navy-700">{user.name}</p>
          <p className="truncate text-xs text-muted">{user.email} · {user.role}</p>
          <button onClick={logout} className="mt-3 text-sm font-medium text-brand-600 hover:text-brand-700">
            Выйти
          </button>
          <Link href="/ru" target="_blank" className="mt-2 block text-xs text-muted hover:text-brand-600">
            Открыть сайт ↗
          </Link>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-line bg-white px-5 py-3 md:hidden">
          <Image src="/logo.svg" alt="RUDN" width={100} height={32} className="h-7 w-auto" />
          <button onClick={logout} className="text-sm font-medium text-brand-600">Выйти</button>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-line bg-white px-3 py-2 md:hidden">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm text-navy-700">
              {n.label}
            </Link>
          ))}
        </nav>
        <main className="p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
