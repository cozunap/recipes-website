import { z } from 'zod';

export const NodeStyleSchema = z.record(z.string(), z.string().or(z.number()));

export const NodePropsSchema = z.record(z.string(), z.any());

export const PageNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string(),
    type: z.string(),
    props: NodePropsSchema.optional(),
    styles: z.object({
      desktop: NodeStyleSchema.optional(),
      tablet: NodeStyleSchema.optional(),
      mobile: NodeStyleSchema.optional(),
    }).optional(),
    children: z.array(PageNodeSchema).optional(),
    bindings: z.record(z.string(), z.string()).optional(), // e.g. { "props.text": "post.title" }
  })
);

export type PageNode = z.infer<typeof PageNodeSchema>;

export const PageDocumentSchema = z.object({
  version: z.number().default(1),
  root: PageNodeSchema,
});
