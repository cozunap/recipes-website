import React from 'react';
import { PageNode } from '@/lib/validation/pageSchema';

export type WidgetCategory = 'Layout' | 'Basic' | 'Media' | 'Content' | 'Navigation' | 'Forms' | 'Advanced';

export interface WidgetControl {
  name: string;
  label: string;
  type: 'text' | 'number' | 'color' | 'select' | 'boolean' | 'image' | 'richtext';
  options?: { label: string; value: string | number }[];
  defaultValue?: any;
}

export interface WidgetTab {
  name: string;
  controls: WidgetControl[];
}

export interface WidgetDefinition {
  type: string;
  name: string;
  icon: any; // Lucide icon
  category: WidgetCategory;
  defaultSettings: Record<string, any>;
  defaultStyles: Record<string, any>;
  tabs: {
    content: WidgetControl[];
    style: WidgetControl[];
    advanced: WidgetControl[];
  };
  component: React.FC<{ node: PageNode; isEditor?: boolean; children?: React.ReactNode }>;
}

class WidgetRegistry {
  private widgets = new Map<string, WidgetDefinition>();

  register(def: WidgetDefinition) {
    if (this.widgets.has(def.type)) {
      console.warn(`Widget ${def.type} is already registered.`);
    }
    this.widgets.set(def.type, def);
  }

  get(type: string): WidgetDefinition | undefined {
    return this.widgets.get(type);
  }

  getAll(): WidgetDefinition[] {
    return Array.from(this.widgets.values());
  }

  getByCategory(): Record<WidgetCategory, WidgetDefinition[]> {
    const grouped = {} as Record<WidgetCategory, WidgetDefinition[]>;
    this.getAll().forEach(widget => {
      if (!grouped[widget.category]) grouped[widget.category] = [];
      grouped[widget.category].push(widget);
    });
    return grouped;
  }
}

export const widgetRegistry = new WidgetRegistry();
