import { apiClient } from './api.js';

const ACCESS_KEY =
  (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '').trim() ||
  '1bc0d5d6-4c63-4bb2-ad14-aacaf599294e';

export const sendContactMail = async (payload) => {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      name: `${payload.name} ${payload.surname}`.trim(),
      email: payload.email,
      subject: `[DevJourney Contact] ${payload.subject}`,
      message: payload.message,
      from_name: 'DevJourney Contact',
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'Failed to send email');
  }

  // Best-effort DB save (email already delivered via Web3Forms)
  try {
    await apiClient.post('/api/mail/send', payload);
  } catch (error) {
    console.warn('[contact] Backend save failed:', error?.message || error);
  }

  return { data: { emailSent: true, message: 'Message sent successfully' } };
};
