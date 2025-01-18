import * as z from "zod";

const commonEmail = z.string().email("Invalid email format");

export const registerSchema = z.object({
    email: commonEmail,
    password: z.string().min(8, "Must be at least 8 digits"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;