import nodemailer from 'nodemailer';

const CONTACT_TO = process.env.MAIL_TO || 'halitaltun002@gmail.com';

const toBool = (value, fallback = false) => {
  if (value === undefined || value === null || value === '') return fallback;
  return String(value).toLowerCase() === 'true';
};

export const getSmtpConfig = () => {
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').trim();
  const host = (process.env.SMTP_HOST || (user.endsWith('@gmail.com') ? 'smtp.gmail.com' : '')).trim();
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = toBool(process.env.SMTP_SECURE, port === 465);
  const from = (process.env.MAIL_FROM || user || CONTACT_TO).trim();
  const to = (process.env.MAIL_TO || CONTACT_TO).trim();

  return { host, port, secure, user, pass, from, to };
};

export const isSmtpConfigured = () => {
  const { host, user, pass, to } = getSmtpConfig();
  return Boolean(host && user && pass && to);
};

export const sendContactEmail = async (payload) => {
  if (!isSmtpConfigured()) {
    throw new Error(
      'SMTP is not configured. Set SMTP_USER and SMTP_PASS (Gmail App Password) on the Render service environment variables.',
    );
  }

  const smtp = getSmtpConfig();
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: {
      user: smtp.user,
      pass: smtp.pass,
    },
  });

  const fullName = `${payload.name} ${payload.surname}`.trim();

  await transporter.sendMail({
    from: smtp.from,
    to: smtp.to,
    replyTo: payload.email,
    subject: `[DevJourney Contact] ${payload.subject}`,
    text: [
      'New contact form message',
      '',
      `Name: ${fullName}`,
      `Email: ${payload.email}`,
      `Subject: ${payload.subject}`,
      '',
      'Message:',
      payload.message,
    ].join('\n'),
    html: `
      <h2>New contact form message</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> <a href="mailto:${payload.email}">${payload.email}</a></p>
      <p><strong>Subject:</strong> ${payload.subject}</p>
      <hr />
      <p style="white-space:pre-wrap;">${payload.message}</p>
    `,
  });

  return { sent: true, to: smtp.to };
};
