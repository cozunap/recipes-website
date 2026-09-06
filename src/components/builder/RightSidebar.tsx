import React, { useState } from 'react';
import { useEditorStore } from '@/lib/state/editor';
import { widgetRegistry as registry } from './widgets/registry';
import { LayoutList, Paintbrush, Settings2, Trash2 } from 'lucide-react';

export default function RightSidebar() {
  const selectedNodeId = useEditorStore((state) => state.selectedNodeId);
  const nodes = useEditorStore((state) => state.nodes);
  const deleteNode = useEditorStore((state) => state.deleteNode);
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'advanced'>('content');

  const findNode = (nodesList: any[], id: string): any => {
    for (const node of nodesList) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNode(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedNode = selectedNodeId ? findNode(nodes, selectedNodeId) : null;
  const def = selectedNode ? registry.get(selectedNode.type) : null;

  if (!selectedNode || !def) {
    return (
      <div className="w-[300px] bg-[#1f1f1f] border-l border-[#333] flex items-center justify-center text-gray-500 text-xs shrink-0 h-screen">
        Select an element to edit properties
      </div>
    );
  }

  return (
    <div className="w-[300px] bg-[#1f1f1f] text-gray-300 flex flex-col shrink-0 border-l border-[#333] h-screen overflow-hidden">
      
      {/* Header */}
      <div className="flex h-12 bg-[#d72b3f] text-white items-center px-4 justify-between">
        <div className="flex items-center space-x-2">
          <Settings2 size={16} />
          <h3 className="font-semibold text-sm">Edit {def.name}</h3>
        </div>
        <button 
          onClick={() => deleteNode(selectedNode.id)}
          className="hover:bg-white/20 p-1.5 rounded transition-colors"
          title="Delete Element"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#262626] border-b border-[#333] text-[11px] font-medium uppercase tracking-wider">
        <button 
          className={`flex-1 py-3 flex items-center justify-center gap-1.5 ${activeTab === 'content' ? 'bg-[#1f1f1f] text-white border-t-2 border-[#d72b3f]' : 'text-gray-500 hover:text-gray-300 border-t-2 border-transparent'}`}
          onClick={() => setActiveTab('content')}
        >
          <LayoutList size={12} /> Content
        </button>
        <button 
          className={`flex-1 py-3 flex items-center justify-center gap-1.5 ${activeTab === 'style' ? 'bg-[#1f1f1f] text-white border-t-2 border-[#d72b3f]' : 'text-gray-500 hover:text-gray-300 border-t-2 border-transparent'}`}
          onClick={() => setActiveTab('style')}
        >
          <Paintbrush size={12} /> Style
        </button>
        <button 
          className={`flex-1 py-3 flex items-center justify-center gap-1.5 ${activeTab === 'advanced' ? 'bg-[#1f1f1f] text-white border-t-2 border-[#d72b3f]' : 'text-gray-500 hover:text-gray-300 border-t-2 border-transparent'}`}
          onClick={() => setActiveTab('advanced')}
        >
          <Settings2 size={12} /> Advanced
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-0">
        
        {activeTab === 'content' && (
          <div className="border-b border-[#333]">
            <div className="px-4 py-2 bg-[#2a2a2a] text-xs font-medium text-white flex items-center cursor-pointer">
              <span className="w-0 h-0 border-t-4 border-t-transparent border-l-4 border-l-gray-400 border-b-4 border-b-transparent mr-2 transform rotate-90"></span>
              {def.name} Options
            </div>
            <div className="p-4 space-y-4">
              {def.tabs.content.map((schema: any) => (
                <div key={schema.name} className="flex flex-col space-y-2">
                  <label className="text-[11px] text-gray-400 font-medium">{schema.label}</label>
                  {schema.type === 'select' ? (
                    <div className="relative">
                      <select
                        className="w-full bg-[#111] border border-[#333] rounded-sm px-2 py-1.5 text-xs text-white focus:outline-none focus:border-[#d72b3f] appearance-none"
                        value={selectedNode.settings[schema.name] || schema.defaultValue || ''}
                        onChange={(e) => {
                          useEditorStore.getState().updateNodeSettings(selectedNode.id, { [schema.name]: e.target.value });
                        }}
                      >
                        {schema.options?.map((opt: any) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      <div className="absolute right-2 top-2 pointer-events-none text-gray-500">▼</div>
                    </div>
                  ) : (
                    <input 
                      type={schema.type === 'number' ? 'number' : 'text'} 
                      className="w-full bg-[#111] border border-[#333] rounded-sm px-2 py-1.5 text-xs text-white focus:outline-none focus:border-[#d72b3f]"
                      value={selectedNode.settings[schema.name] || ''}
                      onChange={(e) => {
                        useEditorStore.getState().updateNodeSettings(selectedNode.id, { [schema.name]: e.target.value });
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'style' && (
          <div className="p-4 text-xs text-gray-500 italic text-center">
            Typography, Color, and Shadow controls go here.
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="border-b border-[#333]">
             <div className="px-4 py-2 bg-[#2a2a2a] text-xs font-medium text-white flex items-center cursor-pointer">
              <span className="w-0 h-0 border-t-4 border-t-transparent border-l-4 border-l-gray-400 border-b-4 border-b-transparent mr-2 transform rotate-90"></span>
              Layout
            </div>
            <div className="p-4 space-y-4">
              
              <div className="space-y-2">
                <label className="text-[11px] text-gray-400 font-medium flex justify-between">
                  <span>Margin</span>
                  <span className="text-[9px] bg-[#333] px-1 py-0.5 rounded">PX</span>
                </label>
                <div className="flex items-center gap-1">
                  <input type="text" placeholder="Top" className="w-full bg-[#111] border border-[#333] rounded-sm px-1 py-1.5 text-center text-xs text-white"
                    value={selectedNode.styles?.desktop?.marginTop || ''}
                    onChange={(e) => useEditorStore.getState().updateNodeStyles(selectedNode.id, { desktop: { ...selectedNode.styles?.desktop, marginTop: e.target.value }})}
                  />
                  <input type="text" placeholder="Right" className="w-full bg-[#111] border border-[#333] rounded-sm px-1 py-1.5 text-center text-xs text-white disabled:opacity-50" disabled />
                  <input type="text" placeholder="Bot" className="w-full bg-[#111] border border-[#333] rounded-sm px-1 py-1.5 text-center text-xs text-white"
                    value={selectedNode.styles?.desktop?.marginBottom || ''}
                    onChange={(e) => useEditorStore.getState().updateNodeStyles(selectedNode.id, { desktop: { ...selectedNode.styles?.desktop, marginBottom: e.target.value }})}
                  />
                  <input type="text" placeholder="Left" className="w-full bg-[#111] border border-[#333] rounded-sm px-1 py-1.5 text-center text-xs text-white disabled:opacity-50" disabled />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] text-gray-400 font-medium">Padding (All)</label>
                <input type="text" className="w-full bg-[#111] border border-[#333] rounded-sm px-2 py-1.5 text-xs text-white"
                  value={selectedNode.styles?.desktop?.padding || ''}
                  onChange={(e) => useEditorStore.getState().updateNodeStyles(selectedNode.id, { desktop: { ...selectedNode.styles?.desktop, padding: e.target.value }})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] text-gray-400 font-medium">Background Color</label>
                <input type="text" placeholder="#ffffff" className="w-full bg-[#111] border border-[#333] rounded-sm px-2 py-1.5 text-xs text-white font-mono"
                  value={selectedNode.styles?.desktop?.backgroundColor || ''}
                  onChange={(e) => useEditorStore.getState().updateNodeStyles(selectedNode.id, { desktop: { ...selectedNode.styles?.desktop, backgroundColor: e.target.value }})}
                />
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
