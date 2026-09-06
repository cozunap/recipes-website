import React from "react";
import { ResponsiveStyles } from "../schemas/page";

// Simplified schema definition for the editor UI to render controls
export type ControlType = "text" | "number" | "color" | "select" | "boolean" | "image";

export interface PropControlSchema {
  name: string; // The prop key
  label: string;
  type: ControlType;
  options?: { label: string; value: string | number }[]; // For select type
  defaultValue?: any;
}

export interface ComponentProps {
  id: string;
  styles: ResponsiveStyles;
  children?: React.ReactNode;
  [key: string]: any;
}

export interface ComponentDefinition {
  type: string;
  name: string;
  icon: any; // e.g., Lucide icon
  category: "layout" | "typography" | "media" | "forms" | "marketing" | "navigation" | "advanced";
  defaultProps: Record<string, any>;
  defaultStyles: ResponsiveStyles;
  propSchema: PropControlSchema[];
  render: React.FC<ComponentProps>;
}
