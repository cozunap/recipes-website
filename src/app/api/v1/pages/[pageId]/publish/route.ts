import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import { revalidatePath } from 'next/cache';

export async function POST(
  request: Request,
  { params }: { params: { pageId: string } }
) {
  try {
    const { pageId } = params;
    
    // 1. Fetch Draft
    const draftDoc = await adminDb.collection('page_versions').doc(`${pageId}_draft`).get();
    if (!draftDoc.exists) {
      return NextResponse.json({ error: 'Draft not found' }, { status: 404 });
    }
    const draftData = draftDoc.data();

    // 2. Validate (mock Zod validation step)
    if (!draftData?.nodes) {
      throw new Error('Invalid page schema');
    }

    // 3. Create Published Version
    await adminDb.collection('page_versions').doc(`${pageId}_published`).set({
      ...draftData,
      status: 'published',
      publishedAt: new Date().toISOString(),
    });

    // 4. Invalidate Next.js Cache (ISR)
    // We would need the actual slug to revalidate properly, but we can revalidate all for now
    revalidatePath('/', 'layout');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Publish error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
