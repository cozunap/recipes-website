import { create } from 'zustand';
import { PageNode } from '@/schemas/page';

interface EditorState {
  nodes: PageNode[];
  selectedNodeId: string | null; saveStatus?: "idle" | "saving" | "saved" | "error"; setSaveStatus?: (s: string) => void;
  history: PageNode[][];
  historyIndex: number;
  
  setNodes: (nodes: PageNode[]) => void;
  selectNode: (id: string | null) => void;
  updateNodeSettings: (id: string, settings: any) => void;
  updateNodeStyles: (id: string, styles: any) => void;
  addNode: (node: PageNode, parentId?: string) => void;
  deleteNode: (id: string) => void;
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

const filterTree = (nodes: PageNode[], idToRemove: string): PageNode[] => {
  return nodes.filter(node => node.id !== idToRemove).map(node => {
    if (node.children) {
      return { ...node, children: filterTree(node.children, idToRemove) };
    }
    return node;
  });
};

export const useEditorStore = create<EditorState>((set, get) => ({
  nodes: [],
  selectedNodeId: null, saveStatus: "idle", setSaveStatus: (s: any) => set({ saveStatus: s }),
  history: [[]],
  historyIndex: 0,
  
  saveHistory: (newNodes) => {
    const { history, historyIndex } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newNodes);
    if (newHistory.length > 50) newHistory.shift();
    set({ nodes: newNodes, history: newHistory, historyIndex: newHistory.length - 1 });
  },

  setNodes: (nodes) => set({ nodes, history: [nodes], historyIndex: 0 }),
  
  selectNode: (id) => set({ selectedNodeId: id }),
  
  updateNodeSettings: (id, settings) => {
    const newNodes = mapTree(get().nodes, id, (node) => ({
      ...node,
      settings: { ...node.settings, ...settings }
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

  deleteNode: (id) => {
    const newNodes = filterTree(get().nodes, id);
    get().saveHistory(newNodes);
    set({ selectedNodeId: null });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      set({ nodes: history[historyIndex - 1], historyIndex: historyIndex - 1, selectedNodeId: null });
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      set({ nodes: history[historyIndex + 1], historyIndex: historyIndex + 1, selectedNodeId: null });
    }
  }
}));
