import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/client';
import { collection, getDocs, addDoc, doc, setDoc, query, where } from 'firebase/firestore';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const websiteId = searchParams.get('websiteId');
    
    const pagesRef = collection(db, 'pages');
    const q = websiteId ? query(pagesRef, where('websiteId', '==', websiteId)) : pagesRef;
    
    const snapshot = await getDocs(q);
    const pages = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    return NextResponse.json({ pages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, websiteId, slug } = body;
    const docRef = await addDoc(collection(db, 'pages'), {
      name,
      websiteId,
      slug,
      createdAt: new Date().toISOString()
    });
    
    await setDoc(doc(db, 'page_versions', `${docRef.id}_draft`), {
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
