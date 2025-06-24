import { z } from "zod";

export const createissueschema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(25),
  description: z.string().min(1, { message: "Description is required" }),
});
