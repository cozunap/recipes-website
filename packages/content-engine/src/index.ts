import get from 'lodash.get';

export interface CMSContext {
  [key: string]: any; // E.g., { post: { title: "Hello", featuredImage: "url" } }
}

export interface NodeBinding {
  property: string; // e.g. "props.text" or "props.imageSrc"
  path: string;     // e.g. "post.title" or "property.price"
}

/**
 * Resolves a single binding against the provided CMS Context.
 */
export function resolveBinding(path: string, context: CMSContext): any {
  // Check if it's a template string e.g. "Price: {{property.price}}"
  const regex = /\{\{(.*?)\}\}/g;
  
  if (regex.test(path)) {
    return path.replace(regex, (_, p1) => {
      const val = get(context, p1.trim());
      return val !== undefined ? String(val) : '';
    });
  }
  
  // Direct path resolution
  return get(context, path);
}

/**
 * Traverses a node's bindings and applies them to its props/styles.
 * Returns a new hydrated node object.
 */
export function hydrateNode(node: any, context: CMSContext): any {
  if (!node.bindings || Object.keys(node.bindings).length === 0) {
    return node;
  }

  const hydrated = JSON.parse(JSON.stringify(node)); // Deep clone

  for (const [property, path] of Object.entries(node.bindings as Record<string, string>)) {
    const value = resolveBinding(path, context);
    
    if (value !== undefined) {
      // property could be nested like 'props.text'
      const parts = property.split('.');
      let current = hydrated;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = value;
    }
  }

  return hydrated;
}
