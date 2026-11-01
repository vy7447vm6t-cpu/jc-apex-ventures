import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { divisions } from '@/content/divisions';

// Website enquiries go only to our own inboxes, never to an address the visitor supplies.
const MAIN_INBOX = 'admin@jcapexv.com';
const INBOXES = new Set([MAIN_INBOX, ...divisions.flatMap((d) => d.contact.emails)].map((a) => a.toLowerCase()));
const ourInbox = (address: unknown) => {
  const a = typeof address === 'string' ? address.trim().toLowerCase() : '';
  return INBOXES.has(a) ? a : undefined;
};
const looksLikeEmail = (address: unknown) => typeof address === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.trim());
const oneLine = (text: string, max: number) => text.replace(/[\r\n]+/g, ' ').slice(0, max);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      name,
      email,
      phone,
      subject = 'New Enquiry from Website',
      body,
      to,
      cc,
      details,
    } = data;
    const recipient = ourInbox(to) ?? MAIN_INBOX;
    const copy = ourInbox(cc);

    if (!name && !email && !phone && !body) {
      return NextResponse.json(
        { error: 'At least one contact identifier or message body is required' },
        { status: 400 }
      );
    }

    // Check if SMTP is configured
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS || process.env.GOOGLE_APP_PASSWORD;

    const emailContent = (typeof body === 'string' && body ? body : '').slice(0, 10000) || `
New enquiry received through JC Apex Ventures web portal:

Name: ${name || 'Not provided'}
Email: ${email || 'Not provided'}
Phone: ${phone || 'Not provided'}

Details:
${typeof details === 'object' ? JSON.stringify(details, null, 2) : details || 'N/A'}

---
Sent automatically from JC Apex Ventures website.
    `.trim();

    if (!smtpUser || !smtpPass) {
      // Say so rather than report a message that was never sent; the forms then offer email or WhatsApp.
      console.warn('[API /contact] SMTP_USER / SMTP_PASSWORD are not set; the enquiry was not sent.', { to: recipient, subject });
      return NextResponse.json(
        { success: false, mode: 'not-configured', error: 'Email sending is not set up on this server.' },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT) === 587 ? false : true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"JC Apex Web Portal" <${smtpUser}>`,
      to: recipient,
      cc: copy,
      replyTo: looksLikeEmail(email) ? email.trim() : undefined,
      subject: `[Website Enquiry] ${oneLine(String(subject), 200)}`,
      text: emailContent,
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      message: 'Enquiry sent successfully.',
    });
  } catch (error: unknown) {
    const err = error as Record<string, unknown>;
    console.error('[API /contact] Error sending email:', err);
    return NextResponse.json(
      {
        success: false,
        error: (err?.message as string) || 'Failed to send message',
      },
      { status: 500 }
    );
  }
}
