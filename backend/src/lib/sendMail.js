const CONTACT_TO = process.env.MAIL_TO || 'halitaltun002@gmail.com';

const toBool = (value, fallback = false) => {
  if (value === undefined || value === null || value === '') return fallback;
  return String(value).toLowerCase() === 'true';
};

const withTimeout = (promise, ms, label) =>
  Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
    }),
  ]);

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

const sendViaFormSubmit = async (payload) => {
  const to = (process.env.MAIL_TO || CONTACT_TO).trim();
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: `${payload.name} ${payload.surname}`.trim(),
      email: payload.email,
      subject: payload.subject,
      message: payload.message,
      _subject: `[DevJourney Contact] ${payload.subject}`,
      _template: 'table',
      _captcha: 'false',
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || `FormSubmit failed (${response.status})`);
  }

  return { sent: true, to, provider: 'formsubmit' };
};

const sendViaSmtp = async (payload) => {
  const smtp = getSmtpConfig();
  if (!smtp.host || !smtp.user || !smtp.pass || !smtp.to) {
    throw new Error('SMTP is not configured');
  }

  const nodemailer = (await import('nodemailer')).default;
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12000,
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

  return { sent: true, to: smtp.to, provider: 'smtp' };
};

/**
 * Prefer HTTPS FormSubmit (works on Render free).
 * Fall back to SMTP with short timeouts.
 */
export const sendContactEmail = async (payload) => {
  const preferSmtp = toBool(process.env.MAIL_PREFER_SMTP, false);

  if (!preferSmtp) {
    try {
      return await withTimeout(sendViaFormSubmit(payload), 15000, 'FormSubmit');
    } catch (formSubmitError) {
      console.warn('FormSubmit failed, trying SMTP:', formSubmitError.message);
    }
  }

  return withTimeout(sendViaSmtp(payload), 15000, 'SMTP');
};
