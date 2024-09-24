import { z } from 'zod';

export const EditorSchema = z.object({
  biz_id : z.string().nullable(),
  title : z.string(),
  // slide_image : z.instanceof(File),
  description : z.string(),
  slide_image: z.union([z.instanceof(File), z.string()]),
  is_active : z.string().nullable()
});

export type EditorSchemaType = z.infer<typeof EditorSchema>;
