import * as z from "zod";

const commonStringMinLength3 = z.string().min(3, "Must be at least 3 characters");
const commonEmail = z.string().email("Invalid email format");

export const registerSchema = z.object({
    salutation: z.string().min(1, "Required"),
    first_name: commonStringMinLength3,
    last_name: commonStringMinLength3,
    email: commonEmail,
    phone: z.string().min(10, "Must be at least 10 characters"),
    password: z.string().min(8, "Must be at least 8 characters"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;