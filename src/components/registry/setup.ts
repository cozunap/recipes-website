import { registry } from "./index";
import { ContainerDef } from "./components/Container";
import { HeadingDef } from "./components/Heading";

// Initialize registry with base components
registry.register(ContainerDef);
registry.register(HeadingDef);

export { registry };
