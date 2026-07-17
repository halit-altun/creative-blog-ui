import { apiClient } from './api.js';

const MAIL_TO = import.meta.env.VITE_MAIL_TO || 'halitaltun002@gmail.com';

const isFormSubmitSuccess = (data) =>
  data?.success === true || data?.success === 'true';

export const sendContactMail = async (payload) => {
  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(MAIL_TO)}`,
    {
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
    },
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !isFormSubmitSuccess(data)) {
    throw new Error(data.message || 'Failed to send email');
  }

  // Save copy to backend DB (best effort — email already sent from browser)
  try {
    await apiClient.post('/api/mail/send', payload);
  } catch (error) {
    console.warn('[contact] Backend save failed:', error);
  }

  return {
    data: {
      emailSent: true,
      message: 'Message sent successfully',
    },
  };
};
