import React from "react";
import { PageNode } from "@/schemas/page";
import { registry } from "@/components/registry";

interface RendererProps {
  node: PageNode;
}

export const Renderer: React.FC<RendererProps> = ({ node }) => {
  const ComponentDef = registry.get(node.type);

  if (!ComponentDef) {
    return (
      <div style={{ padding: 16, border: "1px dashed red", color: "red" }}>
        Missing component: {node.type}
      </div>
    );
  }

  return (
    <ComponentDef.render id={node.id} styles={node.styles} {...node.props}>
      {node.children?.map((child) => (
        <Renderer key={child.id} node={child} />
      ))}
    </ComponentDef.render>
  );
};
