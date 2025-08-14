import z from "zod";

export const searchSchema = z.object({
    q: z.string().min(1, "You must enter a search term"),
})

export type searchSchema = z.infer<typeof searchSchema>