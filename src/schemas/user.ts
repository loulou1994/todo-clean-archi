import { z } from "zod";

export type User = {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserInsert = z.infer<typeof userInsertSchema>;

const imagePattern = /^https?:\/\/[^\s\/?#]+(?:\/[^\s?#]*)*\/[\w\-\.~]+\.(?:jpg|jpeg|png|gif|webp|bmp|svg)(?:\?[^\s#]*)?(?:#[^\s]*)?$/;

export const userInsertSchema = z
  .object({
    username: z
      .string()
      .regex(/^(?=.*[A-Za-z\d@$!%*?&])[A-Za-z\d@$!%*?& \-_]{6,15}(?<! )$/),
    email: z.string().email(),
    password: z
      .string()
      .regex(/^(?=.*[A-Za-z\d@$!%*?&])[A-Za-z\d@$!%*?& \-_]{6,15}(?<! )$/, {
        message: "didn't match required pattern",
      }),
    passwordConfirm: z.string(),
    image: z.string().optional().refine((data) => data && imagePattern.test(data), {
      message: "Incorrect image format",
      path: ["image"]
    })
  })
  .refine((data) => data.password == data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });
