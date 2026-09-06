import React from "react";
import { ComponentDefinition, ComponentProps } from "@/types/component";
import { parseStyles } from "@/lib/renderer/style-parser";

interface HeadingProps extends ComponentProps {
  text: string;
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const HeadingRender: React.FC<ComponentProps> = ({ styles, text, level, ...props }) => {
  const Tag = (level || "h2") as keyof JSX.IntrinsicElements;
  return (
    <Tag style={parseStyles(styles)} {...props}>
      {text}
    </Tag>
  );
};

export const HeadingDef: ComponentDefinition = {
  type: "heading",
  name: "Heading",
  icon: null,
  category: "typography",
  defaultProps: {
    text: "Heading Text",
    level: "h2",
  },
  defaultStyles: {
    desktop: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      color: "#333",
    },
  },
  propSchema: [
    {
      name: "text",
      label: "Text",
      type: "text",
      defaultValue: "Heading Text",
    },
    {
      name: "level",
      label: "Level",
      type: "select",
      options: [
        { label: "H1", value: "h1" },
        { label: "H2", value: "h2" },
        { label: "H3", value: "h3" },
      ],
      defaultValue: "h2",
    },
  ],
  render: HeadingRender,
};
