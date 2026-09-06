"use client";

import React, { useState } from 'react';
import { WidgetDefinition } from '../registry';
import { Layout } from 'lucide-react';
import { useEditorStore } from '@/lib/state/editor';
import { Renderer } from '../../../renderer/Renderer';

export const ContainerWidget: WidgetDefinition = {
  type: 'container',
  name: 'Container',
  icon: Layout,
  category: 'Layout',
  defaultSettings: { maxWidth: 'fluid' },
  defaultStyles: { padding: '20px' },
  tabs: {
    content: [
      { name: 'maxWidth', label: 'Max Width', type: 'select', options: [
        { label: 'Fluid', value: 'fluid' }, { label: 'Narrow', value: 'narrow' }
      ], defaultValue: 'fluid' }
    ],
    style: [],
    advanced: []
  },
  component: ({ node, isEditor }) => {
    const [isOver, setIsOver] = useState(false);
    const style = node.styles?.desktop || {};
    
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
        className={`${node.settings?.maxWidth === 'fluid' ? 'w-full' : 'max-w-4xl mx-auto'} ${isEditor ? 'min-h-[100px]' : ''} ${isOver ? 'ring-2 ring-blue-400 bg-blue-50/10' : ''}`}
        style={style}
        onDragOver={(e) => { if(isEditor) { e.preventDefault(); e.stopPropagation(); setIsOver(true); } }}
        onDragLeave={(e) => { if(isEditor) { e.preventDefault(); e.stopPropagation(); setIsOver(false); } }}
        onDrop={handleDrop}
      >
        {node.children && node.children.length > 0 ? (
          node.children.map((child: any) => <Renderer key={child.id} node={child} isEditor={isEditor} />)
        ) : isEditor ? (
          <div className="w-full h-full min-h-[80px] border-2 border-dashed border-gray-200 rounded flex items-center justify-center text-gray-400 pointer-events-none">Drag elements here</div>
        ) : null}
      </div>
    );
  }
};
