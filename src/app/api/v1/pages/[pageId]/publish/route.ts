import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/client';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export const runtime = 'edge';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ pageId: string }> }
) {
  try {
    const resolvedParams = await params;
    const pageId = resolvedParams.pageId;
    
    const draftDoc = await getDoc(doc(db, 'page_versions', `${pageId}_draft`));
    if (!draftDoc.exists()) {
      return NextResponse.json({ error: 'Draft not found' }, { status: 404 });
    }
    const draftData = draftDoc.data();

    if (!draftData?.nodes) {
      throw new Error('Invalid page schema');
    }

    await setDoc(doc(db, 'page_versions', `${pageId}_published`), {
      ...draftData,
      status: 'published',
      publishedAt: new Date().toISOString(),
    });

    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
