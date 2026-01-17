import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { name, email, phone, message } = await req.json();

  // Dynamic import to avoid build issues
  const nodemailer = (await import('nodemailer')).default;

  // Configure transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.CONTACT_RECEIVER || process.env.SMTP_USER,
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    const errorMessage = typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : String(error);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
