import { useEffect, useRef } from 'react';
import { useEditorStore } from '@/lib/state/editor';
import { db } from '@/lib/firebase/client';
import { doc, setDoc } from 'firebase/firestore';

export function useAutosave(pageId: string) {
  const nodes = useEditorStore((state) => state.nodes);
  const setSaveStatus = useEditorStore((state) => state.setSaveStatus);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedRef = useRef(JSON.stringify(nodes));

  useEffect(() => {
    const currentNodesStr = JSON.stringify(nodes);
    
    // Don't save if nothing changed
    if (currentNodesStr === lastSavedRef.current) return;

    if (setSaveStatus) setSaveStatus('saving');

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        await setDoc(doc(db, 'page_versions', `${pageId}_draft`), {
          pageId,
          nodes: JSON.parse(currentNodesStr),
          status: 'draft',
          updatedAt: new Date().toISOString(),
        });
        
        lastSavedRef.current = currentNodesStr;
        if (setSaveStatus) setSaveStatus('saved');
      } catch (error) {
        console.error('Autosave error:', error);
        if (setSaveStatus) setSaveStatus('error');
      }
    }, 1500); // 1.5s debounce

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [nodes, pageId, setSaveStatus]);
}
