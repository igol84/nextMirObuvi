import {z} from "zod";

export const schema = z.object({
  firstName: z.string().trim()
    .min(2, 'gt2')
    .max(16, 'lt16'),
  lastName: z.string().trim()
    .min(2, 'gt2')
    .max(16, 'lt16'),
  phone: z.string().trim().length(9, 'l9'),
  email: z.string().trim().email('invalidEmail').or(z.literal('')),
  delivery: z.string().trim()
})

export type Schema = z.infer<typeof schema>
