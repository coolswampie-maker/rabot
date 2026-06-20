import crypto from 'crypto';

// Lightweight in-memory rate limiter for public form endpoints.
// Good enough for a single-instance deployment; swap for Redis/Upstash when
// running multiple instances (documented in README "Before production").

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.count >= limit) return false;
  bucket.count += 1;
  return true;
}

export function hashIp(ip: string): string {
  const salt = process.env.AUTH_SECRET || 'rudn';
  return crypto.createHash('sha256').update(ip + salt).digest('hex').slice(0, 32);
}

export function clientIp(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  );
}
