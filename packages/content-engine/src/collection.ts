import { hydrateNode } from './index';

export interface CollectionData {
  items: any[];
}

/**
 * Resolves a collection repeater node into a flat array of nodes.
 * Used when a builder node represents a "Collection List".
 */
export function renderCollection(templateNode: any, collectionData: CollectionData): any[] {
  return collectionData.items.map((item, index) => {
    // Create a local context just for this item
    const localContext = { item, index };
    
    // Hydrate the template node with the local context
    return hydrateNode(templateNode, localContext);
  });
}
