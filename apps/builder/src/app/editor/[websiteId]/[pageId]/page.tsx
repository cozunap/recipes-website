'use client';
import React, { useState } from 'react';

export default function BuilderEditor({ params }: { params: { websiteId: string, pageId: string } }) {
  // In the future, this will fetch the Draft revision from the API
  const [deviceMode, setDeviceMode] = useState<'desktop'|'tablet'|'mobile'>('desktop');
  
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#1f1f1f] text-slate-200">
      {/* TopBar */}
      <div className="h-12 border-b border-[#333] flex items-center justify-between px-4 bg-[#262626]">
        <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-white">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white">V</div>
          <span>Editor</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setDeviceMode('desktop')} className={`px-2 py-1 rounded text-xs ${deviceMode==='desktop'?'bg-[#444] text-white':'text-slate-400'}`}>Desktop</button>
          <button onClick={() => setDeviceMode('tablet')} className={`px-2 py-1 rounded text-xs ${deviceMode==='tablet'?'bg-[#444] text-white':'text-slate-400'}`}>Tablet</button>
          <button onClick={() => setDeviceMode('mobile')} className={`px-2 py-1 rounded text-xs ${deviceMode==='mobile'?'bg-[#444] text-white':'text-slate-400'}`}>Mobile</button>
        </div>
        <div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded text-xs font-semibold shadow-md transition-colors">Publish</button>
        </div>
      </div>
      
      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar (Widgets & Structure) */}
        <div className="w-64 border-r border-[#333] bg-[#262626] p-4 overflow-y-auto">
          <h3 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-4">Widgets</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#333] p-4 flex flex-col items-center justify-center rounded cursor-grab hover:bg-[#444] transition-colors">
              <div className="w-6 h-6 bg-slate-500 mb-2 rounded-sm"></div>
              <span className="text-[10px] font-medium text-slate-300">Container</span>
            </div>
            <div className="bg-[#333] p-4 flex flex-col items-center justify-center rounded cursor-grab hover:bg-[#444] transition-colors">
              <div className="w-6 h-1 bg-slate-500 mb-2 rounded-sm"></div>
              <span className="text-[10px] font-medium text-slate-300">Heading</span>
            </div>
          </div>
        </div>
        
        {/* Canvas Area */}
        <div className="flex-1 bg-[#111] overflow-auto flex justify-center py-8">
          <div className={`bg-white shadow-2xl transition-all duration-300 ${deviceMode === 'desktop' ? 'w-full max-w-[1200px]' : deviceMode === 'tablet' ? 'w-[768px]' : 'w-[375px]'} min-h-[800px] border border-[#333]`}>
             {/* Canvas Drop Zone */}
             <div className="h-full w-full p-4 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 m-4 w-[calc(100%-2rem)] min-h-[200px]">
               Drag widgets here
             </div>
          </div>
        </div>

        {/* Right Sidebar (Settings & Properties) */}
        <div className="w-72 border-l border-[#333] bg-[#262626] p-4 overflow-y-auto">
          <h3 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-4">Properties</h3>
          <div className="text-xs text-slate-400 text-center mt-10">Select an element to edit</div>
        </div>
      </div>
    </div>
  );
}
