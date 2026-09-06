import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    
    let query: FirebaseFirestore.Query = adminDb.collection('websites');
    if (projectId) {
      query = query.where('projectId', '==', projectId);
    }
    
    const snapshot = await query.get();
    const websites = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ websites });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, projectId, domain } = body;
    const docRef = await adminDb.collection('websites').add({
      name,
      projectId,
      domain,
      createdAt: new Date().toISOString()
    });
    return NextResponse.json({ id: docRef.id, name, projectId, domain });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
