export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    [key: string]: string;
  };
  typography: {
    fontFamilyHeading: string;
    fontFamilyBody: string;
    baseSize: string;
  };
  spacing: {
    containerWidth: string;
    sectionPadding: string;
  };
}

/**
 * Generates a raw CSS string of CSS Custom Properties (Variables)
 * from the stored JSON theme configuration.
 */
export function generateThemeVariables(theme: ThemeConfig): string {
  let css = ':root {\n';
  
  // Colors
  for (const [key, value] of Object.entries(theme.colors)) {
    css += `  --color-${key}: ${value};\n`;
  }

  // Typography
  css += `  --font-heading: ${theme.typography.fontFamilyHeading};\n`;
  css += `  --font-body: ${theme.typography.fontFamilyBody};\n`;
  css += `  --font-base-size: ${theme.typography.baseSize};\n`;

  // Spacing
  css += `  --container-width: ${theme.spacing.containerWidth};\n`;
  css += `  --section-padding: ${theme.spacing.sectionPadding};\n`;

  css += '}\n';
  return css;
}
