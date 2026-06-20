'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: fd.get('email'), password: fd.get('password') }),
    });
    setLoading(false);
    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      setError(res.status === 429 ? 'Слишком много попыток. Подождите.' : 'Неверный email или пароль.');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper p-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-center">
          <Image src="/logo.svg" alt="RUDN" width={150} height={50} className="h-11 w-auto" />
        </div>
        <form onSubmit={onSubmit} className="card space-y-4 p-7">
          <div>
            <h1 className="text-xl font-semibold text-navy-700">Админ-панель</h1>
            <p className="text-sm text-muted">Вход для редакторов</p>
          </div>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-navy-700">Email</span>
            <input name="email" type="email" required className="w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-brand-400" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-navy-700">Пароль</span>
            <input name="password" type="password" required className="w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-brand-400" />
          </label>
          {error && <p className="text-sm font-medium text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? '…' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}
