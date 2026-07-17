const CONTACT_TO = process.env.MAIL_TO || 'halitaltun002@gmail.com';

const isFormSubmitSuccess = (data) =>
  data?.success === true || data?.success === 'true';

export const sendContactEmail = async (payload) => {
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

  if (!response.ok || !isFormSubmitSuccess(data)) {
    throw new Error(data.message || `Email delivery failed (${response.status})`);
  }

  return { sent: true, provider: 'formsubmit' };
};
