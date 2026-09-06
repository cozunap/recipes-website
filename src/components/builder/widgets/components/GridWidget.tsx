"use client";

import React, { useState } from 'react';
import { WidgetDefinition } from '../registry';
import { Columns } from 'lucide-react';
import { useEditorStore } from '@/lib/state/editor';
import { Renderer } from '../../../renderer/Renderer';

export const GridWidget: WidgetDefinition = {
  type: 'grid',
  name: 'Grid',
  icon: Columns,
  category: 'Layout',
  defaultSettings: { columns: '2', gap: '1rem' },
  defaultStyles: { padding: '20px' },
  tabs: {
    content: [
      { name: 'columns', label: 'Columns', type: 'select', options: [
        { label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }
      ], defaultValue: '2' },
      { name: 'gap', label: 'Gap', type: 'text', defaultValue: '1rem' }
    ],
    style: [],
    advanced: []
  },
  component: ({ node, isEditor }) => {
    const [isOver, setIsOver] = useState(false);
    const style = node.styles?.desktop || {};
    const columns = parseInt(node.settings?.columns || '2', 10);
    const gap = node.settings?.gap || '1rem';
    
    const handleDrop = (e: React.DragEvent) => {
      if (!isEditor) return;
      e.preventDefault(); e.stopPropagation(); setIsOver(false);
      const componentType = e.dataTransfer.getData('componentType');
      if (componentType) {
        useEditorStore.getState().addNode({ id: Math.random().toString(36).substr(2, 9), type: componentType, settings: {}, styles: { desktop: {} }, children: [] }, node.id);
      }
    };

    return (
      <div 
        className={`grid w-full ${isEditor ? 'min-h-[100px]' : ''} ${isOver ? 'ring-2 ring-blue-400 bg-blue-50/10' : ''}`}
        style={{ ...style, gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap }}
        onDragOver={(e) => { if(isEditor) { e.preventDefault(); e.stopPropagation(); setIsOver(true); } }}
        onDragLeave={(e) => { if(isEditor) { e.preventDefault(); e.stopPropagation(); setIsOver(false); } }}
        onDrop={handleDrop}
      >
        {node.children && node.children.length > 0 ? (
          node.children.map((child: any) => <Renderer key={child.id} node={child} isEditor={isEditor} />)
        ) : isEditor ? (
          <div className="col-span-full w-full h-full min-h-[80px] border-2 border-dashed border-gray-200 rounded flex items-center justify-center text-gray-400 pointer-events-none">Drag elements into this Grid</div>
        ) : null}
      </div>
    );
  }
};
