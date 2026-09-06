import React from 'react';
import { useEditorStore } from '@/lib/state/editor';
import { registry } from '../registry/setup';

export default function RightSidebar() {
  const selectedNodeId = useEditorStore((state) => state.selectedNodeId);
  const nodes = useEditorStore((state) => state.nodes);

  // Helper to find node in tree
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
      <div className="w-72 border-l border-gray-200 bg-white flex items-center justify-center text-gray-400 shrink-0">
        Select an element to edit
      </div>
    );
  }

  return (
    <div className="w-72 border-l border-gray-200 bg-white flex flex-col shrink-0">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h3 className="font-semibold text-gray-800">{def.name}</h3>
        <span className="text-xs bg-gray-200 px-2 py-0.5 rounded text-gray-600">{selectedNode.id.substring(0,6)}</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {/* Render dynamic controls based on schema */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold uppercase text-gray-500 tracking-wider">Properties</h4>
          {def.propSchema.map((schema) => (
            <div key={schema.name} className="flex flex-col space-y-1">
              <label className="text-xs text-gray-600">{schema.label}</label>
              <input 
                type="text" 
                className="border border-gray-300 rounded px-2 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                value={selectedNode.props[schema.name] || ''}
                onChange={(e) => {
                  useEditorStore.getState().updateNodeProps(selectedNode.id, {
                    [schema.name]: e.target.value
                  });
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
