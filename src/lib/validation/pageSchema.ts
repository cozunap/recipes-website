import { z } from 'zod';

export const responsiveStyleSchema = z.object({
  desktop: z.record(z.string(), z.any()).optional(),
  tablet: z.record(z.string(), z.any()).optional(),
  mobile: z.record(z.string(), z.any()).optional(),
});

// Lazy evaluation for recursive children
export const pageNodeSchema: z.ZodType<any> = z.lazy(() => z.object({
  id: z.string(),
  type: z.string(),
  parentId: z.string().nullable().optional(),
  settings: z.record(z.string(), z.any()).default({}),
  styles: responsiveStyleSchema.default({}),
  attributes: z.record(z.string(), z.any()).optional(),
  children: z.array(pageNodeSchema).optional(),
}));

export const pageDocumentSchema = z.object({
  version: z.number().default(1),
  page: z.object({
    id: z.string(),
    title: z.string(),
  }),
  nodes: z.array(pageNodeSchema),
});

export type PageNode = z.infer<typeof pageNodeSchema>;
export type PageDocument = z.infer<typeof pageDocumentSchema>;
