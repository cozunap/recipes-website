import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/client';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    
    const websitesRef = collection(db, 'websites');
    const q = projectId ? query(websitesRef, where('projectId', '==', projectId)) : websitesRef;
    
    const snapshot = await getDocs(q);
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
    const docRef = await addDoc(collection(db, 'websites'), {
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
