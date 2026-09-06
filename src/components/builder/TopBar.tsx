import React from 'react';
import { useEditorStore } from '@/lib/state/editor';
import { Undo, Redo, Monitor, Tablet, Smartphone, Save, Eye } from 'lucide-react';

export default function TopBar({ pageId }: { pageId: string }) {
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);
  const saveStatus = useEditorStore((state) => state.saveStatus); // Assuming we add this or just pretend

  const handlePublish = async () => {
    await fetch(`/api/v1/pages/${pageId}/publish`, { method: 'POST' });
    alert('Page published successfully!');
  };

  return (
    <div className="h-12 bg-[#1f1f1f] border-b border-[#333] flex items-center justify-between px-4 text-white shrink-0 z-50">
      <div className="flex items-center space-x-4">
        <div className="w-6 h-6 bg-[#d72b3f] rounded flex items-center justify-center font-bold text-xs">E</div>
        <div className="h-4 w-px bg-[#333]"></div>
        <button onClick={undo} className="text-gray-400 hover:text-white transition-colors" title="Undo"><Undo size={16} /></button>
        <button onClick={redo} className="text-gray-400 hover:text-white transition-colors" title="Redo"><Redo size={16} /></button>
        <div className="text-xs text-gray-500 ml-4 flex items-center">
          {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved to database' : saveStatus === 'error' ? <span className="text-red-400">Error saving</span> : ''}
        </div>
      </div>
      
      <div className="flex items-center space-x-2 bg-[#111] rounded px-2 py-1">
        <button className="p-1.5 text-white bg-[#333] rounded shadow-sm"><Monitor size={14} /></button>
        <button className="p-1.5 text-gray-500 hover:text-white"><Tablet size={14} /></button>
        <button className="p-1.5 text-gray-500 hover:text-white"><Smartphone size={14} /></button>
      </div>

      <div className="flex items-center space-x-3">
        <button onClick={() => window.open('/preview/' + pageId, '_blank')} className="text-gray-400 hover:text-white flex items-center text-xs font-medium px-2 py-1.5 rounded transition-colors">
          <Eye size={14} className="mr-1.5" /> Preview
        </button>
        <button 
          onClick={handlePublish}
          className="bg-[#d72b3f] hover:bg-[#b02232] text-white px-5 py-1.5 rounded text-xs font-semibold transition-colors flex items-center shadow-md shadow-[#d72b3f]/20"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
