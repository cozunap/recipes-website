'use client';
import React from 'react';
import TopBar from './TopBar';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import Canvas from './Canvas';
import { useAutosave } from '@/hooks/useAutosave';

export default function EditorLayout({ pageId = 'page_001' }: { pageId?: string }) {
  // Initialize autosave for this page
  const saveStatus = useAutosave(pageId);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100 overflow-hidden text-sm">
      <TopBar />
      {/* Simple save status indicator */}
      <div className="absolute top-4 right-40 text-xs text-gray-500 z-50 pointer-events-none">
        {saveStatus === 'saving' && 'Saving...'}
        {saveStatus === 'saved' && 'Saved to draft'}
        {saveStatus === 'error' && <span className="text-red-500">Error saving</span>}
      </div>
      <div className="flex-1 flex overflow-hidden">
        <LeftSidebar />
        <Canvas />
        <RightSidebar />
      </div>
    </div>
  );
}
