import 'server-only';
import { join } from 'path';
import nodemailer, { type Transporter } from 'nodemailer';

/** Inline logo shipped with every email so it renders without a public image host. */
export const LOGO_CID = 'harvestvita-logo';
const logoPath = join(process.cwd(), 'public', 'logo.png');

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host) throw new Error('SMTP_HOST environment variable is not set.');
  if (!user || !pass) throw new Error('SMTP_USER / SMTP_PASS environment variables are not set.');

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  return transporter;
}

export const FROM_ADDRESS = process.env.SMTP_FROM_ADDRESS ?? 'HarvestVita <noreply@harvestvita.in>';
export const OWNER_EMAIL = process.env.OWNER_EMAIL ?? 'arishkhan3312@gmail.com';

type SendMailInput = {
  from: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

type SendMailResult = { error: Error | null };

/**
 * Thin wrapper around Nodemailer that mirrors the `{ error }` result shape
 * the codebase previously got from Resend, so call sites stay unchanged.
 */
export async function sendMail(input: SendMailInput): Promise<SendMailResult> {
  try {
    await getTransporter().sendMail({
      ...input,
      attachments: [{ filename: 'logo.png', path: logoPath, cid: LOGO_CID, contentDisposition: 'inline' }],
    });
    return { error: null };
  } catch (err) {
    return { error: err instanceof Error ? err : new Error(String(err)) };
  }
}
