import React, { useState } from 'react';
import { useEditorStore } from '@/lib/state/editor';
import { Renderer } from '../renderer/Renderer';

export default function Canvas() {
  const nodes = useEditorStore((state) => state.nodes);
  const addNode = useEditorStore((state) => state.addNode);
  const selectNode = useEditorStore((state) => state.selectNode);
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    
    // Only handle drops directly on the canvas background, not inside containers
    const componentType = e.dataTransfer.getData('componentType');
    if (componentType) {
      const newNode = {
        id: Math.random().toString(36).substr(2, 9),
        type: componentType,
        settings: {},
        styles: {},
        children: []
      };
      addNode(newNode);
    }
  };

  return (
    <div 
      className={`flex-1 bg-gray-100 overflow-y-auto p-8 flex justify-center`}
      onClick={() => selectNode(null)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div 
        className={`w-full max-w-7xl min-h-[800px] bg-white shadow-sm transition-colors ${
          isOver && nodes.length === 0 ? 'bg-blue-50 ring-2 ring-blue-400' : ''
        }`}
      >
        {nodes.map((node) => (
          <Renderer key={node.id} node={node} isEditor={true} />
        ))}
        {nodes.length === 0 && (
          <div className="w-full h-full min-h-[800px] flex items-center justify-center text-gray-400 pointer-events-none">
            Drag and drop a Container here to start building
          </div>
        )}
      </div>
    </div>
  );
}
