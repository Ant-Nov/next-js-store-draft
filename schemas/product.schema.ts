import * as z from "zod";

export const imageFileSchema = z
  .file({error: 'Invalid file.'})
  .max(1_000_000, { error: 'Max file size is 1MB' })
  .refine(file => file.type.startsWith('image/'), { error: 'Only images are allowed' });

export const idSchema = z.object({
  id: z.string(),
});

export const productSchema = z.object({
  name: z
    .string()
    .min(4, {
      error: 'name must be at least 4 characters.',
    })
    .max(30, {
      error: 'name must be less than 30 characters.',
    }),
  company: z.string(),
  featured: z.coerce.boolean(),
  price: z.coerce.number().int().min(0, {
    error: 'price must be a positive number.',
  }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(' ').length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      error: 'description must be between 10 and 1000 words.',
    }
  ),
});

export const amountSchema = z.object({
  amount: z.coerce.number().min(1).max(10),
});