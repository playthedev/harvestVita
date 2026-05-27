import 'server-only';
import { Resend } from 'resend';

const key = process.env.RESEND_API_KEY;
if (!key) throw new Error('RESEND_API_KEY environment variable is not set.');

export const resend = new Resend(key);

// Set RESEND_FROM_ADDRESS to 'HarvestVita <noreply@harvestvita.in>' once the
// domain is verified in the Resend dashboard. Falls back to the sandbox address
// which can only send to the Resend-account owner's email.
export const FROM_ADDRESS =
  process.env.RESEND_FROM_ADDRESS ?? 'HarvestVita <onboarding@resend.dev>';
export const OWNER_EMAIL = process.env.OWNER_EMAIL ?? 'arishkhan3312@gmail.com';
