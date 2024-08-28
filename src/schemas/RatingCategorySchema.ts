import { z } from "zod";

export const RatingCategorySchema = z.object({
  name_en: z.string().nonempty({message : "Please Enter Name (English)."}).min(4),
  name_mm: z.string().nonempty({message : "Please Enter Name (Myanmar)."}).min(4),
  is_active : z.string().nullable(),
});