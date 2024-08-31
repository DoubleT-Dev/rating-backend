import { z } from 'zod';

export const BizAddressSchema = z.object({
  categories_id: z.string({
    invalid_type_error: 'Please select a Category.',
  }),
  name_en: z.string().nonempty({ message: "English name is required" }),
  name_mm: z.string().nonempty({ message: "Myanmar name is required" }),
  is_active : z.string().nullable(),
  description: z.string().nullable(),
  contact: z.string().nonempty({ message: "Contact No is required" }),
  address_1: z.string().nonempty({ message: "Address Field is required" }),
  address_2 : z.string().nullable(),
  // city: z.string().nonempty({ message: "City is required" }),
  // township: z.string().nonempty({ message: "Township is required" }),
  // region: z.string().nonempty({ message: "Region is required" }),
  city: z.string().nullable(),
  township: z.string().nullable(),
  region: z.string().nullable(),
});

export type BizAddressSchemaType = z.infer<typeof BizAddressSchema>;
