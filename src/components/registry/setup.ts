import { widgetRegistry } from '../builder/widgets/registry';
import { HeadingWidget } from '../builder/widgets/components/HeadingWidget';
import { ContainerWidget } from '../builder/widgets/components/ContainerWidget';
import { GridWidget } from '../builder/widgets/components/GridWidget';

// Register all widgets
widgetRegistry.register(HeadingWidget);
widgetRegistry.register(ContainerWidget);
widgetRegistry.register(GridWidget);

export const registry = widgetRegistry;
