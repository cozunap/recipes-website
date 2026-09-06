import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const websiteId = searchParams.get('websiteId');
    
    let query: FirebaseFirestore.Query = adminDb.collection('pages');
    if (websiteId) {
      query = query.where('websiteId', '==', websiteId);
    }
    
    const snapshot = await query.get();
    const pages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ pages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, websiteId, slug } = body;
    const docRef = await adminDb.collection('pages').add({
      name,
      websiteId,
      slug,
      createdAt: new Date().toISOString()
    });
    
    // Create initial blank draft
    await adminDb.collection('page_versions').doc(`${docRef.id}_draft`).set({
      pageId: docRef.id,
      nodes: [],
      status: 'draft',
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json({ id: docRef.id, name, websiteId, slug });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
