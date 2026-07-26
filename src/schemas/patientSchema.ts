import { z } from 'zod';

// Phone Regex supporting Thai standard phone (0812345678, 081-234-5678, +66...)
const phoneRegex = /^(\+66|0)[0-9]{1,2}[- ]?[0-9]{3}[- ]?[0-9]{3,4}$/;

export const patientSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First Name is required / กรุณากรอกชื่อจริง')
    .min(2, 'First Name must be at least 2 characters'),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, 'Last Name is required / กรุณากรอกนามสกุล')
    .min(2, 'Last Name must be at least 2 characters'),
  dob: z
    .string()
    .min(1, 'Date of Birth is required / กรุณาเลือกวันเกิด')
    .refine((dateStr) => {
      const date = new Date(dateStr);
      return !isNaN(date.getTime()) && date < new Date();
    }, 'Date of birth must be a valid past date'),
  gender: z.enum(['male', 'female', 'non_binary', 'prefer_not_to_say'], {
    required_error: 'Please select a gender / กรุณาเลือกเพศ',
  }),

  phone: z
    .string()
    .min(1, 'Phone number is required / กรุณากรอกเบอร์โทรศัพท์')
    .regex(phoneRegex, 'Invalid phone number format (e.g. 081-234-5678)'),
  email: z
    .string()
    .min(1, 'Email is required / กรุณากรอกอีเมล')
    .email('Invalid email address format (e.g. patient@example.com)'),
  address: z
    .string()
    .min(1, 'Address is required / กรุณากรอกที่อยู่')
    .min(5, 'Address must be at least 5 characters'),

  preferredLanguage: z
    .string()
    .min(1, 'Preferred Language is required / กรุณาเลือกภาษาที่สะดวก'),
  nationality: z
    .string()
    .min(1, 'Nationality is required / กรุณาหน้าระบุสัญชาติ'),

  // Optional fields
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z
    .string()
    .optional()
    .refine((val) => !val || phoneRegex.test(val), {
      message: 'Invalid emergency contact phone format',
    }),
  emergencyRelationship: z.string().optional(),
  religion: z.string().optional(),
});

export type PatientSchemaType = z.infer<typeof patientSchema>;
