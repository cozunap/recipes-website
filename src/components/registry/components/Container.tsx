import React from "react";
import { ComponentDefinition, ComponentProps } from "@/types/component";
import { parseStyles } from "@/lib/renderer/style-parser";

const ContainerRender: React.FC<ComponentProps> = ({ styles, children, ...props }) => {
  return (
    <div style={parseStyles(styles)} {...props}>
      {children}
    </div>
  );
};

export const ContainerDef: ComponentDefinition = {
  type: "container",
  name: "Container",
  icon: null, // Will add lucide icon later
  category: "layout",
  defaultProps: {},
  defaultStyles: {
    desktop: {
      padding: "20px",
      display: "flex",
      flexDirection: "column",
    },
  },
  propSchema: [],
  render: ContainerRender,
};
