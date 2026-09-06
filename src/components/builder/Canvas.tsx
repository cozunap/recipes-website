import React, { useState } from 'react';
import { useEditorStore } from '@/lib/state/editor';
import { registry } from '../registry/setup';
import { Renderer } from '../renderer/Renderer';

export default function Canvas() {
  const nodes = useEditorStore((state) => state.nodes);
  const addNode = useEditorStore((state) => state.addNode);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    e.stopPropagation();
    
    const type = e.dataTransfer.getData('componentType');
    if (type) {
      const def = registry.get(type);
      if (def) {
        const newNode = {
          id: `${type}_${Math.random().toString(36).substr(2, 9)}`,
          type: type,
          props: { ...def.defaultProps },
          styles: JSON.parse(JSON.stringify(def.defaultStyles)),
          children: []
        };
        addNode(newNode);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <div className="flex-1 bg-gray-100 p-8 overflow-y-auto flex justify-center">
      <div 
        className={`w-full max-w-[1200px] min-h-[800px] bg-white shadow-sm ring-1 transition-colors ${isDragOver ? 'ring-blue-500 ring-2' : 'ring-gray-200'}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {nodes.length === 0 ? (
          <div className="h-full w-full flex items-center justify-center text-gray-400 pointer-events-none">
            Drag and drop elements here
          </div>
        ) : (
          nodes.map(node => (
            <div key={node.id} onClick={(e) => {
                e.stopPropagation();
                useEditorStore.getState().selectNode(node.id);
            }} className="relative group cursor-pointer hover:ring-2 hover:ring-blue-400 ring-inset transition-all">
                <Renderer node={node} />
                <div className="absolute top-0 left-0 bg-blue-500 text-white text-[10px] px-1 hidden group-hover:block z-10">
                    {registry.get(node.type)?.name}
                </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
