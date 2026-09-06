import React from 'react';
import EditorLayout from '@/components/builder/EditorLayout';

export const runtime = 'edge';

export default async function EditorPage({ params }: { params: Promise<{ websiteId: string, pageId: string }> }) {
  const resolvedParams = await params;
  return <EditorLayout pageId={resolvedParams.pageId} />;
}
