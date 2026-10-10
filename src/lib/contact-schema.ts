import { z } from "zod";
import { PROJECT_TYPES } from "./constants";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Вкажіть ім’я (мінімум 2 символи)")
    .max(80, "Ім’я занадто довге"),
  email: z
    .string()
    .trim()
    .email("Вкажіть коректний email")
    .max(120, "Email занадто довгий"),
  phone: z
    .string()
    .trim()
    .min(7, "Вкажіть номер телефону")
    .max(30, "Номер занадто довгий")
    .regex(/^[\d\s+\-()]+$/, "Допустимі лише цифри та символи телефону"),
  projectType: z.enum(PROJECT_TYPES, {
    errorMap: () => ({ message: "Оберіть тип проєкту" }),
  }),
  message: z
    .string()
    .trim()
    .min(10, "Опишіть задачу (мінімум 10 символів)")
    .max(2000, "Повідомлення занадто довге"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
