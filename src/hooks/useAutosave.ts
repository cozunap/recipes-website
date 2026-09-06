import { useEffect, useRef, useState } from 'react';
import { useEditorStore } from '@/lib/state/editor';

export function useAutosave(pageId: string) {
  const nodes = useEditorStore((state) => state.nodes);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedRef = useRef(JSON.stringify(nodes));

  useEffect(() => {
    const currentNodesStr = JSON.stringify(nodes);
    
    // Don't save if nothing changed
    if (currentNodesStr === lastSavedRef.current) return;

    setSaveStatus('saving');

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        const response = await fetch(`/api/v1/pages/${pageId}/revisions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nodes, status: 'draft' })
        });
        
        if (!response.ok) throw new Error('Save failed');
        
        lastSavedRef.current = currentNodesStr;
        setSaveStatus('saved');
      } catch (error) {
        console.error('Autosave error:', error);
        setSaveStatus('error');
      }
    }, 1500); // 1.5s debounce

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [nodes, pageId]);

  return saveStatus;
}
