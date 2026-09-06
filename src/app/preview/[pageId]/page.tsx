import React from 'react';
import { db } from '@/lib/firebase/client';
import { doc, getDoc } from 'firebase/firestore';
import { Renderer } from '@/components/renderer/Renderer';
import '@/components/registry/setup';

export const runtime = 'edge';

export default async function PreviewPage({ params }: { params: Promise<{ pageId: string }> }) {
  const resolvedParams = await params;
  const pageId = resolvedParams.pageId;
  
  // Fetch draft from Firebase
  let nodes = [];
  try {
    const docRef = doc(db, 'page_versions', `${pageId}_draft`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      nodes = docSnap.data().nodes || [];
    }
  } catch (e) {
    console.error("Error fetching preview data", e);
  }

  if (!nodes || nodes.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500 font-sans">
        Nothing to preview. Add some elements to the canvas first!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {nodes.map((node: any) => (
        <Renderer key={node.id} node={node} isEditor={false} />
      ))}
    </div>
  );
}
