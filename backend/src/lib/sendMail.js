const withTimeout = (promise, ms, label) =>
  Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
    }),
  ]);

/**
 * Web3Forms HTTPS API — works on Render free (no SMTP ports needed).
 * Access key is configured in Render env; recipient email is set in Web3Forms dashboard.
 * Network tab only shows POST /api/mail/send (no personal email leaked).
 */
const sendViaWeb3Forms = async (payload) => {
  const accessKey = (process.env.WEB3FORMS_ACCESS_KEY || '').trim();
  if (!accessKey) {
    throw new Error(
      'WEB3FORMS_ACCESS_KEY is missing. Create a free key at https://web3forms.com and add it to Render env.',
    );
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: accessKey,
      name: `${payload.name} ${payload.surname}`.trim(),
      email: payload.email,
      subject: `[DevJourney Contact] ${payload.subject}`,
      message: payload.message,
      from_name: 'DevJourney Contact',
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.message || `Web3Forms failed (${response.status})`);
  }

  return { sent: true, provider: 'web3forms' };
};

export const sendContactEmail = async (payload) =>
  withTimeout(sendViaWeb3Forms(payload), 20000, 'Email');
