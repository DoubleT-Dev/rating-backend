import { z } from "zod";

export const CategorySchema = z.object({
  name_en: z.string().nonempty({message : "Please Enter Name."}).min(4),
  name_mm: z.string().min(4),
});