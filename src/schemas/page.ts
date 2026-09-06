import { z } from "zod";

export const ResponsiveStylesSchema = z.object({
  desktop: z.record(z.string(), z.any()).optional(),
  tablet: z.record(z.string(), z.any()).optional(),
  mobile: z.record(z.string(), z.any()).optional(),
});

export type ResponsiveStyles = z.infer<typeof ResponsiveStylesSchema>;

export const PageNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string(),
    type: z.string(),
    props: z.record(z.string(), z.any()),
    styles: ResponsiveStylesSchema,
    children: z.array(PageNodeSchema).optional(),
  })
);

export type PageNode = z.infer<typeof PageNodeSchema>;

export const SEOSettingsSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  ogImage: z.string().url().optional(),
});

export type SEOSettings = z.infer<typeof SEOSettingsSchema>;

export const PageSchema = z.object({
  id: z.string(),
  type: z.literal("page"),
  slug: z.string(),
  status: z.enum(["draft", "published"]),
  websiteId: z.string(),
  seo: SEOSettingsSchema,
  sections: z.array(PageNodeSchema),
});

export type Page = z.infer<typeof PageSchema>;
