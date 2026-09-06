"use client";

import React from 'react';
import { WidgetDefinition } from '../registry';
import { Type } from 'lucide-react';

export const HeadingWidget: WidgetDefinition = {
  type: 'heading',
  name: 'Heading',
  icon: Type,
  category: 'Basic',
  defaultSettings: { text: 'Heading Text', level: 'h2' },
  defaultStyles: {},
  tabs: {
    content: [
      { name: 'text', label: 'Text', type: 'text', defaultValue: 'Heading Text' },
      { name: 'level', label: 'HTML Tag', type: 'select', options: [
        { label: 'H1', value: 'h1' }, { label: 'H2', value: 'h2' }, { label: 'H3', value: 'h3' },
        { label: 'H4', value: 'h4' }, { label: 'H5', value: 'h5' }, { label: 'H6', value: 'h6' }
      ], defaultValue: 'h2' }
    ],
    style: [],
    advanced: []
  },
  component: ({ node }) => {
    const text = node.settings?.text || 'Heading Text';
    const level = node.settings?.level || 'h2';
    const style = node.styles?.desktop || {};
    const Tag = level as keyof React.JSX.IntrinsicElements;
    return <Tag style={style}>{text}</Tag>;
  }
};
