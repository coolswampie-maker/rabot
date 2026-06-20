import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { putFile } from '@/lib/storage';

export const runtime = 'nodejs';

// Authenticated media upload. Type/size limits enforced in storage.putFile.
export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const form = await req.formData().catch(() => null);
  const file = form?.get('file');
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'no_file' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const stored = await putFile({ buffer, filename: file.name, mimeType: file.type });
    await prisma.media.create({
      data: {
        url: stored.url,
        filename: stored.filename,
        mimeType: stored.mimeType,
        size: stored.size,
      },
    });
    return NextResponse.json({ url: stored.url, filename: stored.filename });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
