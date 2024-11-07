import * as z from "zod";

const commonStringMinLength3 = z.string().min(3, "Must be at least 3 digits");
const commonEmail = z.string().email("Invalid email format");

export const registerSchema = z.object({
    first_name: commonStringMinLength3,
    last_name: commonStringMinLength3,
    email: commonEmail,
    phone: z.string().min(10, "Must be at least 10 digits"),
    password: z.string().min(8, "Must be at least 8 digits"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;