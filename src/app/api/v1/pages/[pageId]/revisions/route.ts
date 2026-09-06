import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/client';
import { doc, setDoc } from 'firebase/firestore';

export const runtime = 'edge';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ pageId: string }> }
) {
  try {
    const resolvedParams = await params;
    const pageId = resolvedParams.pageId;
    const body = await request.json();
    const { nodes, status } = body;

    await setDoc(doc(db, 'page_versions', `${pageId}_${status}`), {
      pageId,
      nodes,
      status,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
