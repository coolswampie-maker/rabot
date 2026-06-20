import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';

// Media storage abstraction.
//
// driver "local" writes to public/uploads for development.
// driver "s3" is a stub that documents where to plug in S3-compatible storage
// (or the university's own object store) for production. Implement `putS3`
// with the AWS SDK or an S3-compatible client when credentials are available.

export type StoredFile = { url: string; filename: string; size: number; mimeType: string };

const DRIVER = process.env.MEDIA_DRIVER || 'local';
const LOCAL_DIR = process.env.MEDIA_LOCAL_DIR || 'public/uploads';
const PUBLIC_PREFIX = process.env.MEDIA_PUBLIC_PREFIX || '/uploads';

const ALLOWED = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/svg+xml',
  'image/gif',
  'application/pdf',
]);
const MAX_BYTES = 15 * 1024 * 1024; // 15 MB

export function assertUploadAllowed(mimeType: string, size: number) {
  if (!ALLOWED.has(mimeType)) {
    throw new Error(`Unsupported file type: ${mimeType}`);
  }
  if (size > MAX_BYTES) {
    throw new Error('File is too large (max 15 MB).');
  }
}

function safeName(name: string): string {
  const base = name.replace(/[^a-zA-Z0-9._-]/g, '-').replace(/-+/g, '-');
  return base.slice(-80);
}

export async function putFile(
  file: { buffer: Buffer; filename: string; mimeType: string },
): Promise<StoredFile> {
  assertUploadAllowed(file.mimeType, file.buffer.length);
  const stamped = `${Date.now()}-${safeName(file.filename)}`;

  if (DRIVER === 's3') {
    return putS3(file, stamped);
  }

  const dir = path.join(process.cwd(), LOCAL_DIR);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, stamped), file.buffer);
  return {
    url: `${PUBLIC_PREFIX}/${stamped}`,
    filename: stamped,
    size: file.buffer.length,
    mimeType: file.mimeType,
  };
}

async function putS3(
  _file: { buffer: Buffer; filename: string; mimeType: string },
  _key: string,
): Promise<StoredFile> {
  // TODO(production): implement with @aws-sdk/client-s3 against S3_ENDPOINT/S3_BUCKET.
  // Kept as a stub so the storage interface is stable and swappable.
  throw new Error('S3 driver not configured. Set MEDIA_DRIVER=local or implement putS3().');
}
