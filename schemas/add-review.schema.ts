import * as z from "zod";

export const addReviewSchema = z.object({
  rating: z.coerce.number().min(1, { error: 'Rating should be at least 1' }).max(5, { error: 'Max rating is 5' }),
  review: z.string().min(2, { error: 'Review should contain at least 2 symbols' }).max(300, { error: 'Review can\'t contain more than 300 symbols' }),
});