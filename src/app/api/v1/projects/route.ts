import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/client';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export const runtime = 'edge';

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, 'projects'));
    const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ projects });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;
    const docRef = await addDoc(collection(db, 'projects'), {
      name,
      createdAt: new Date().toISOString()
    });
    return NextResponse.json({ id: docRef.id, name });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
