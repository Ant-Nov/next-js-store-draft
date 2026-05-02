import z from "zod";

export const validateData = <T>(rawData: unknown, schema: z.ZodSchema<T>): T => {
  const result = schema.safeParse(rawData);

  if (!result.success) {
    const prettyError = z.prettifyError(result?.error);

    throw new Error(prettyError)
  }

  return result.data;
}