import { ComponentDefinition } from "@/types/component";

class ComponentRegistry {
  private components = new Map<string, ComponentDefinition>();

  register(definition: ComponentDefinition) {
    if (this.components.has(definition.type)) {
      console.warn(`Component of type ${definition.type} is already registered. Overwriting.`);
    }
    this.components.set(definition.type, definition);
  }

  get(type: string): ComponentDefinition | undefined {
    return this.components.get(type);
  }

  getAll(): ComponentDefinition[] {
    return Array.from(this.components.values());
  }
}

export const registry = new ComponentRegistry();
