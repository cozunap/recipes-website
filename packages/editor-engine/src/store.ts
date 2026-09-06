import { create } from 'zustand';
import { PageNode } from './schema';

export interface EditorState {
  rootNode: PageNode;
  selectedNodeId: string | null;
  deviceMode: 'desktop' | 'tablet' | 'mobile';
  history: PageNode[];
  historyIndex: number;
  
  selectNode: (id: string | null) => void;
  setDeviceMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  // TODO: Add complex node manipulation methods (add, remove, move)
}

export const createEditorStore = (initialNode: PageNode) => create<EditorState>((set, get) => ({
  rootNode: initialNode,
  selectedNodeId: null,
  deviceMode: 'desktop',
  history: [initialNode],
  historyIndex: 0,

  selectNode: (id) => set({ selectedNodeId: id }),
  setDeviceMode: (mode) => set({ deviceMode: mode }),
}));
