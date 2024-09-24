import { z } from 'zod';

export const BizSchema = z.object({
  categories_id: z.string({
    invalid_type_error: 'Please select a Category.',
  }),
  name_en: z.string().nonempty({ message: "English name is required" }),
  name_mm: z.string().nonempty({ message: "Myanmar name is required" }),
  is_active : z.string().nullable(),
  description: z.string().nullable(),
  logo: z.union([z.instanceof(File), z.string()]),
});

export type BizSchemaType = z.infer<typeof BizSchema>;
