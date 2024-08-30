import { z } from "zod";

export const TagSchema = z.object({
  name_en: z.string().min(4).nonempty({message : "Please Enter Name English."}),
  name_mm: z.string().min(4).nonempty({message : "Please Enter Name Myanmar."}),
});