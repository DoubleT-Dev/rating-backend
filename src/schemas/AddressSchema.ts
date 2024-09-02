import { z } from 'zod';

export const AddressSchema = z.object({
  biz_id : z.string().nullable(),
  contact: z.string().nonempty({ message: "Contact No is required" }),
  address_1: z.string().nonempty({ message: "Address Field is required" }),
  address_2 : z.string().nullable(),
  city: z.string().nonempty({ message: "City is required" }),
  township: z.string().nonempty({ message: "Township is required" }),
  region: z.string().nonempty({ message: "Region is required" }),
});

export type AddressSchemaType = z.infer<typeof AddressSchema>;
