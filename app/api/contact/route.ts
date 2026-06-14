import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendMail, FROM_ADDRESS, OWNER_EMAIL } from '../../lib/mailer';
import { contactAcknowledgement, contactNotificationOwner } from '../../lib/email-templates';

const schema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().min(1, 'Phone number is required'),
  subject: z.string().min(1),
  message: z.string().min(5),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 });
    }

    const { name, email, phone, subject, message } = parsed.data;

    const [ack, notify] = await Promise.all([
      sendMail({
        from: FROM_ADDRESS,
        to: email,
        ...contactAcknowledgement({ name, subject, message }),
      }),
      sendMail({
        from: FROM_ADDRESS,
        to: OWNER_EMAIL,
        replyTo: email,
        ...contactNotificationOwner({ name, email, phone, subject, message }),
      }),
    ]);

    if (ack.error || notify.error) {
      console.error('Mailer error:', ack.error ?? notify.error);
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
