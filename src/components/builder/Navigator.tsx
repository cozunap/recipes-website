import React, { useState } from 'react';
import { useEditorStore } from '@/lib/state/editor';
import { widgetRegistry as registry } from './widgets/registry';
import { Layers, ChevronRight, ChevronDown, Type, Layout, Columns } from 'lucide-react';
import { PageNode } from '@/schemas/page';

export default function Navigator() {
  const nodes = useEditorStore(state => state.nodes);
  const selectedNodeId = useEditorStore(state => state.selectedNodeId);
  const selectNode = useEditorStore(state => state.selectNode);

  const getIcon = (type: string) => {
    switch (type) {
      case 'container': return <Layout size={12} className="text-gray-400" />;
      case 'grid': return <Columns size={12} className="text-gray-400" />;
      case 'heading': return <Type size={12} className="text-gray-400" />;
      default: return <Layers size={12} className="text-gray-400" />;
    }
  };

  const TreeNode = ({ node, level = 0 }: { node: PageNode, level?: number }) => {
    const def = registry.get(node.type);
    const [expanded, setExpanded] = useState(true);
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedNodeId === node.id;

    return (
      <div className="w-full">
        <div 
          className={`flex items-center py-1.5 px-2 hover:bg-[#2a2a2a] cursor-pointer text-xs ${isSelected ? 'bg-[#2a2a2a] text-white' : 'text-gray-300'}`}
          style={{ paddingLeft: `${level * 12 + 8}px` }}
          onClick={(e) => {
            e.stopPropagation();
            selectNode(node.id);
          }}
        >
          <div className="w-4 h-4 flex items-center justify-center mr-1" onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}>
            {hasChildren && (expanded ? <ChevronDown size={12} className="text-gray-500" /> : <ChevronRight size={12} className="text-gray-500" />)}
          </div>
          <div className="mr-2">
            {getIcon(node.type)}
          </div>
          <span className="truncate">{def?.name || node.type}</span>
        </div>
        {hasChildren && expanded && (
          <div className="w-full">
            {node.children!.map((child: any) => (
              <TreeNode key={child.id} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="absolute right-[310px] top-4 w-64 bg-[#1f1f1f] border border-[#333] shadow-xl rounded overflow-hidden flex flex-col max-h-[70vh] z-50">
      <div className="flex h-10 border-b border-[#333] items-center px-4 bg-[#262626] justify-between cursor-move">
        <div className="flex items-center text-xs font-semibold text-gray-300">
          <Layers size={12} className="mr-2" /> Structure
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
        {nodes.map(node => (
          <TreeNode key={node.id} node={node} />
        ))}
        {nodes.length === 0 && (
          <div className="p-4 text-xs text-gray-500 text-center italic">No elements yet</div>
        )}
      </div>
    </div>
  );
}
