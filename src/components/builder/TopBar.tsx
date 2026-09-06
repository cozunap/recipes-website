'use client';
import React, { useState } from 'react';
import { Monitor, Smartphone, Tablet, Undo, Redo, Save, Play } from 'lucide-react';
import { useEditorStore } from '@/lib/state/editor';

export default function TopBar({ pageId = 'page_001' }: { pageId?: string }) {
  const undo = useEditorStore(state => state.undo);
  const redo = useEditorStore(state => state.redo);
  const historyIndex = useEditorStore(state => state.historyIndex);
  const historyLength = useEditorStore(state => state.history.length);
  const [publishing, setPublishing] = useState(false);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < historyLength - 1;

  const handlePublish = async () => {
    setPublishing(true);
    try {
      const res = await fetch(`/api/v1/pages/${pageId}/publish`, { method: 'POST' });
      if (res.ok) {
        alert('Published successfully!');
      } else {
        alert('Failed to publish');
      }
    } catch (e) {
      alert('Error publishing');
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center space-x-2">
        <span className="font-bold text-gray-800">Builder</span>
        <div className="h-4 w-[1px] bg-gray-300 mx-2"></div>
        <span className="text-gray-500">Home Page</span>
      </div>

      <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-md border border-gray-200">
        <button className="p-1.5 hover:bg-white rounded shadow-sm text-gray-800"><Monitor size={16} /></button>
        <button className="p-1.5 hover:bg-white rounded text-gray-500"><Tablet size={16} /></button>
        <button className="p-1.5 hover:bg-white rounded text-gray-500"><Smartphone size={16} /></button>
      </div>

      <div className="flex items-center space-x-2">
        <button onClick={undo} disabled={!canUndo} className={`p-2 ${canUndo ? 'text-gray-600 hover:text-gray-800' : 'text-gray-300'}`}><Undo size={16} /></button>
        <button onClick={redo} disabled={!canRedo} className={`p-2 ${canRedo ? 'text-gray-600 hover:text-gray-800' : 'text-gray-300'}`}><Redo size={16} /></button>
        <div className="h-4 w-[1px] bg-gray-300 mx-1"></div>
        <button className="flex items-center space-x-1 px-3 py-1.5 text-gray-600 hover:bg-gray-50 border border-gray-200 rounded-md">
          <Play size={14} /> <span>Preview</span>
        </button>
        <button onClick={handlePublish} disabled={publishing} className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-md disabled:bg-blue-400">
          <Save size={14} /> <span>{publishing ? 'Publishing...' : 'Publish'}</span>
        </button>
      </div>
    </div>
  );
}
