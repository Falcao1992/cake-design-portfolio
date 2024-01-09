import { z } from "zod";

export const WriteCakeFormSchema = z.object({
  description: z.string().min(1).max(500),
  title: z.string().min(1).max(20),
});
