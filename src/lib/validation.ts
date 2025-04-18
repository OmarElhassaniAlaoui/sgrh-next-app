import { z } from "zod";

export const addEmployeeValidationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  cin: z.string().min(1, "CIN is required"),
  ppr: z.string().min(1, "PPR is required"),
  grade: z.string().optional(),
  ladder: z.string().optional(),
  service: z.string().optional(),
  division: z.string().optional(),
  address: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
  phone: z.string().optional(),
  dateOfBirth: z.date().optional(),
  gender: z.string().optional(),
});
