import React from 'react';
import { PageNode } from '@/schemas/page';

export interface PropControlSchema {
  name: string;
  label: string;
  type: string;
  options?: { label: string; value: string }[];
  defaultValue?: string;
}

export interface BaseComponentProps {
  node: PageNode;
  children?: React.ReactNode;
  isEditor?: boolean;
}

export interface ComponentRegistry {
  name: string;
  type: string;
  component: React.FC<any>;
  propSchema: PropControlSchema[];
}
