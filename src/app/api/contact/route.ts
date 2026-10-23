import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      name,
      email,
      phone,
      subject = 'New Enquiry from Website',
      body,
      to = 'admin@jcapexv.com',
      cc,
      details,
    } = data;

    if (!name && !email && !phone && !body) {
      return NextResponse.json(
        { error: 'At least one contact identifier or message body is required' },
        { status: 400 }
      );
    }

    // Check if SMTP is configured
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS || process.env.GOOGLE_APP_PASSWORD;

    const emailContent = body || `
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
      console.warn(
        '[API /contact] SMTP credentials not set in environment variables (SMTP_USER / SMTP_PASSWORD). Logging enquiry locally:',
        { to, subject, name, email, phone }
      );
      return NextResponse.json({
        success: true,
        mode: 'simulated',
        message: 'Enquiry received. (SMTP credentials pending in .env.local)',
      });
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
      to,
      cc: cc || undefined,
      replyTo: email || undefined,
      subject: `[Website Enquiry] ${subject}`,
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
