import React from 'react';
import { registry } from '../registry/setup';

export default function LeftSidebar() {
  const components = registry.getAll();

  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData('componentType', type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="w-64 border-r border-gray-200 bg-white flex flex-col shrink-0">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-700">Elements</h3>
      </div>
      <div className="p-4 flex-1 overflow-y-auto space-y-2">
        {components.map((comp) => (
          <div 
            key={comp.type}
            draggable
            onDragStart={(e) => handleDragStart(e, comp.type)}
            className="p-3 border border-gray-200 rounded-md flex flex-col items-center justify-center bg-gray-50 hover:border-blue-400 hover:bg-blue-50 cursor-grab transition-colors"
          >
            {/* Placeholder icon */}
            <div className="h-6 w-6 bg-gray-300 rounded mb-2"></div>
            <span className="text-xs font-medium text-gray-700">{comp.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
