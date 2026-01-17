import { z } from "zod";

/**
 * UK phone:
 * +44XXXXXXXXXX
 * 07XXXXXXXXX
 */
const ukPhoneRegex =
    /^(?:\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;

export const contactSchema = z.object({
    name: z.string().min(2, "Name is too short"),

    email: z.string().email("Please enter a valid email"),

    phone: z
        .string()
        .regex(ukPhoneRegex, "Please enter a valid UK phone number"),

    subject: z.string().optional(),

    message: z
        .string()
        .min(10, "Message should be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
