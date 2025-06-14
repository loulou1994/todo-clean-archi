import { z } from "zod";

type Category = {
  id: number;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CategoryInsert = z.infer<typeof _categorySchema>

export const _categorySchema = z.object({
  name: z.string(),
  user_id: z.number(),
});
