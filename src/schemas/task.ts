import { z } from "zod";

export enum TaskStatus {
  PENDING = "pending",
  INPROGRESS = "in-progress",
  COMPLETED = "completed",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
};

export type Task = {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  userId: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TaskInsert = z.infer<typeof taskInsertSchema>;

export const taskInsertSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(["pending", "in-progress", "completed"]).default("pending"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  dueDate: z.string().optional(),
  userId: z.number(),
  categoryId: z.number(),
});
