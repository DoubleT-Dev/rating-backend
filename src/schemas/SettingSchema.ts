import { z } from "zod";

export const SettingSchema = z.object({
  key: z.string().min(4),
  value: z.string().min(4),
});