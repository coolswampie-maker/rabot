import { z } from 'zod';

// Server-side validation for public form submissions.
// Consent to personal data processing is REQUIRED — the schema rejects
// any submission where consentData is not true.

// Base object (keeps .pick available for derived schemas).
const baseSubmission = z.object({
  kind: z.enum(['PROGRAM_APPLICATION', 'ACCELERATOR_APPLICATION', 'CONTACT', 'SUBSCRIPTION']),
  // Name is required for everything except email subscriptions (enforced below).
  name: z.string().trim().max(120).optional().default(''),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  organization: z.string().trim().max(160).optional().or(z.literal('')),
  interest: z.string().trim().max(160).optional().or(z.literal('')),
  message: z.string().trim().max(4000).optional().or(z.literal('')),
  consentData: z.literal(true, { errorMap: () => ({ message: 'consent_required' }) }),
  consentMarketing: z.boolean().optional().default(false),
  locale: z.enum(['ru', 'en']).default('ru'),
  sourcePath: z.string().max(300).optional(),
  // honeypot — must be empty (bots fill it)
  company_website: z.string().max(0).optional(),
});

export const submissionSchema = baseSubmission.superRefine((val, ctx) => {
  if (val.kind !== 'SUBSCRIPTION' && (!val.name || val.name.length < 1)) {
    ctx.addIssue({ path: ['name'], code: z.ZodIssueCode.custom, message: 'required' });
  }
});

export type SubmissionInput = z.infer<typeof submissionSchema>;

// Subscription only needs email + consent.
export const subscriptionSchema = baseSubmission.pick({
  email: true,
  consentData: true,
  consentMarketing: true,
  locale: true,
  sourcePath: true,
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1).max(200),
});

// Public member registration / login.
export const registerSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  password: z.string().min(8, 'password_too_short').max(200),
  subscribe: z.boolean().optional().default(false),
  consentData: z.literal(true, { errorMap: () => ({ message: 'consent_required' }) }),
});

export const memberLoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1).max(200),
});
