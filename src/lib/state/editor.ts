import { create } from 'zustand';
import { PageNode } from '@/schemas/page';

interface EditorState {
  nodes: PageNode[];
  selectedNodeId: string | null;
  history: PageNode[][];
  historyIndex: number;
  
  setNodes: (nodes: PageNode[]) => void;
  selectNode: (id: string | null) => void;
  updateNodeProps: (id: string, props: any) => void;
  updateNodeStyles: (id: string, styles: any) => void;
  addNode: (node: PageNode, parentId?: string) => void;
  undo: () => void;
  redo: () => void;
  saveHistory: (newNodes: PageNode[]) => void;
}

const mapTree = (nodes: PageNode[], id: string, updater: (node: PageNode) => PageNode): PageNode[] => {
  return nodes.map(node => {
    if (node.id === id) {
      return updater(node);
    }
    if (node.children) {
      return {
        ...node,
        children: mapTree(node.children, id, updater)
      };
    }
    return node;
  });
};

export const useEditorStore = create<EditorState>((set, get) => ({
  nodes: [],
  selectedNodeId: null,
  history: [[]],
  historyIndex: 0,
  
  saveHistory: (newNodes) => {
    const { history, historyIndex } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newNodes);
    // Limit history to 50 steps
    if (newHistory.length > 50) newHistory.shift();
    set({ nodes: newNodes, history: newHistory, historyIndex: newHistory.length - 1 });
  },

  setNodes: (nodes) => set({ nodes, history: [nodes], historyIndex: 0 }),
  
  selectNode: (id) => set({ selectedNodeId: id }),
  
  updateNodeProps: (id, props) => {
    const newNodes = mapTree(get().nodes, id, (node) => ({
      ...node,
      props: { ...node.props, ...props }
    }));
    get().saveHistory(newNodes);
  },

  updateNodeStyles: (id, styles) => {
    const newNodes = mapTree(get().nodes, id, (node) => ({
      ...node,
      styles: { ...node.styles, ...styles }
    }));
    get().saveHistory(newNodes);
  },

  addNode: (node, parentId) => {
    let newNodes;
    if (!parentId) {
      newNodes = [...get().nodes, node];
    } else {
      newNodes = mapTree(get().nodes, parentId, (parent) => ({
        ...parent,
        children: [...(parent.children || []), node]
      }));
    }
    get().saveHistory(newNodes);
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      set({ nodes: history[historyIndex - 1], historyIndex: historyIndex - 1 });
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      set({ nodes: history[historyIndex + 1], historyIndex: historyIndex + 1 });
    }
  }
}));
