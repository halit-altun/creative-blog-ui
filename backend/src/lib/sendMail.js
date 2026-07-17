import nodemailer from 'nodemailer';

export const sendContactEmail = async (payload) => {
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').trim();
  const to = (process.env.MAIL_TO || user).trim();
  const from = (process.env.MAIL_FROM || user).trim();
  const host = (process.env.SMTP_HOST || 'smtp.gmail.com').trim();
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure =
    process.env.SMTP_SECURE === 'true' ||
    process.env.SMTP_SECURE === '1' ||
    port === 465;

  if (!user || !pass || !to) {
    throw new Error('SMTP_USER / SMTP_PASS / MAIL_TO missing on Render');
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 25000,
  });

  const fullName = `${payload.name} ${payload.surname}`.trim();

  await transporter.sendMail({
    from,
    to,
    replyTo: payload.email,
    subject: `[DevJourney Contact] ${payload.subject}`,
    text: [
      `Name: ${fullName}`,
      `Email: ${payload.email}`,
      `Subject: ${payload.subject}`,
      '',
      payload.message,
    ].join('\n'),
  });

  return { sent: true };
};
