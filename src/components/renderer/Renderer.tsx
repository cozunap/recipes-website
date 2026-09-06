"use client";
import React from 'react';
import { PageNode } from '@/schemas/page';
import { widgetRegistry as registry } from '../builder/widgets/registry';
import { useEditorStore } from '@/lib/state/editor';

interface RendererProps {
  node: PageNode;
  isEditor?: boolean;
}

export function Renderer({ node, isEditor = false }: RendererProps) {
  const selectedNodeId = useEditorStore((state) => state.selectedNodeId);
  const selectNode = useEditorStore((state) => state.selectNode);
  const def = registry.get(node.type);

  if (!def) {
    return <div className="p-4 border border-red-500 bg-red-50 text-red-500">Unknown component: {node.type}</div>;
  }

  const Component = def.component;
  const isSelected = isEditor && selectedNodeId === node.id;

  const handleClick = (e: React.MouseEvent) => {
    if (!isEditor) return;
    e.stopPropagation(); // Prevent selecting parent when clicking child
    selectNode(node.id);
  };

  const renderedChild = (
    <Component node={node} isEditor={isEditor}>
      {node.children?.map((child: any) => (
        <Renderer key={child.id} node={child} isEditor={isEditor} />
      ))}
    </Component>
  );

  if (isEditor) {
    return (
      <div 
        onClick={handleClick}
        className={`relative group ${isSelected ? 'ring-2 ring-blue-500' : 'hover:ring-1 hover:ring-blue-300'} transition-all`}
      >
        {isSelected && (
          <div className="absolute -top-6 left-0 bg-blue-500 text-white text-[10px] px-2 py-1 rounded-t z-10 font-medium">
            {def.name}
          </div>
        )}
        {renderedChild}
      </div>
    );
  }

  return renderedChild;
}
