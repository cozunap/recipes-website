import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST(
  request: Request,
  { params }: { params: { pageId: string } }
) {
  try {
    const { pageId } = params;
    const body = await request.json();
    const { nodes, status } = body;

    // TODO: Validate against PageSchema using Zod

    // For the MVP, we just overwrite the draft document
    // In a full version, we might push to a subcollection for version history
    const docRef = adminDb.collection('page_versions').doc(`${pageId}_${status}`);
    
    await docRef.set({
      pageId,
      nodes,
      status, // 'draft' | 'published'
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to save revision:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
