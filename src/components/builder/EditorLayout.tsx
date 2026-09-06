
"use client";
import "@/components/registry/setup";

import React, { useEffect } from 'react';
import TopBar from './TopBar';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import Canvas from './Canvas';
import Navigator from './Navigator';
import { useEditorStore } from '@/lib/state/editor';
import { useAutosave } from '@/hooks/useAutosave';
import { PageNode } from '@/schemas/page';

export default function EditorLayout({ pageId }: { pageId: string }) {
  const setNodes = useEditorStore((state) => state.setNodes);
  useAutosave(pageId);

  useEffect(() => {
    fetch(`/api/v1/pages/${pageId}`)
      .then(r => r.json())
      .then(data => {
        if (data.nodes) setNodes(data.nodes);
      });
  }, [pageId, setNodes]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0d0d0d] font-sans selection:bg-[#d72b3f]/30">
      <TopBar pageId={pageId} />
      <div className="flex flex-1 overflow-hidden relative">
        <LeftSidebar />
        <Canvas />
        <Navigator />
        <RightSidebar />
      </div>
    </div>
  );
}
