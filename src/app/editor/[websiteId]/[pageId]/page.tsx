import React from 'react';
import EditorLayout from '@/components/builder/EditorLayout';

export default function EditorPage({ params }: { params: { websiteId: string, pageId: string } }) {
  // In a real app, we would fetch the initial page data from Firestore here or via a client hook
  return <EditorLayout />;
}
