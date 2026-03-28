import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const patientSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  condition: z.string().min(1, 'Condition is required'),
  lastVisit: z.string().min(1, 'Last visit date is required'),
  status: z.enum(['active', 'inactive', 'pending']),
});

export const patientFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  condition: z.string().min(1, 'Condition is required'),
  status: z.enum(['active', 'inactive', 'pending']),
});

export type Patient = z.infer<typeof patientSchema>;
