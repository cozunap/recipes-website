import React, { useState } from 'react';
import { widgetRegistry as registry } from './widgets/registry';
import { Layout, Type, Columns, Search, Menu, Settings, X, Plus } from 'lucide-react';

export default function LeftSidebar() {
  const [activeTab, setActiveTab] = useState<'elements' | 'global'>('elements');

  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData('componentType', type);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'container': return <Layout size={20} className="mb-2" />;
      case 'grid': return <Columns size={20} className="mb-2" />;
      case 'heading': return <Type size={20} className="mb-2" />;
      default: return <div className="w-5 h-5 bg-gray-600 rounded mb-2"></div>;
    }
  };

  return (
    <div className="w-[280px] bg-[#1f1f1f] text-gray-300 flex flex-col shrink-0 border-r border-[#333] h-screen overflow-hidden">
      
      {/* Top Navigation */}
      <div className="flex h-12 border-b border-[#333] items-center px-4 bg-[#262626]">
        <Menu size={18} className="text-gray-400 cursor-pointer hover:text-white" />
        <div className="flex-1 flex justify-center text-xs font-semibold text-white tracking-widest uppercase">
          Elements
        </div>
        <Settings size={18} className="text-gray-400 cursor-pointer hover:text-white" />
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-2.5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search Widget..." 
            className="w-full bg-[#111] border border-[#333] rounded-sm py-1.5 pl-8 pr-3 text-xs text-white focus:outline-none focus:border-[#d72b3f] transition-colors"
          />
        </div>
      </div>

      {/* Widgets Grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        
        {/* Basic Category */}
        <div className="mb-1">
          <div className="px-4 py-2 bg-[#2a2a2a] text-xs font-medium text-white flex items-center cursor-pointer">
            <span className="w-0 h-0 border-t-4 border-t-transparent border-l-4 border-l-gray-400 border-b-4 border-b-transparent mr-2 transform rotate-90"></span>
            Basic
          </div>
          <div className="grid grid-cols-2 gap-[1px] bg-[#333] p-[1px]">
            {Array.from(registry.getAll()).map((def) => (
              <div
                key={def.type}
                draggable
                onDragStart={(e) => handleDragStart(e, def.type)}
                className="flex flex-col items-center justify-center p-4 bg-[#1f1f1f] cursor-grab hover:bg-[#2a2a2a] hover:text-white transition-all group"
              >
                <div className="text-gray-400 group-hover:text-white transition-colors">
                  {getIcon(def.type)}
                </div>
                <span className="text-[10px] font-medium text-center">{def.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Pro Category Dummy */}
        <div className="mb-1">
          <div className="px-4 py-2 bg-[#2a2a2a] text-xs font-medium text-gray-400 flex items-center justify-between cursor-pointer">
            <div className="flex items-center">
              <span className="w-0 h-0 border-t-4 border-t-transparent border-l-4 border-l-gray-500 border-b-4 border-b-transparent mr-2"></span>
              Pro
            </div>
            <Lock size={10} className="text-gray-500" />
          </div>
        </div>

      </div>
    </div>
  );
}

const Lock = ({size, className}: {size: number, className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
)
