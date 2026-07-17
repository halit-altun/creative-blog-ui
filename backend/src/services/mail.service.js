import ContactMessage from '../models/ContactMessage.js';
import { sendContactEmail } from '../lib/sendMail.js';

export const saveContactMessage = async (payload) => {
  const doc = await ContactMessage.create(payload);
  return doc.toObject();
};

export const handleContactSubmission = async (payload) => {
  const saved = await saveContactMessage(payload);

  try {
    const emailResult = await sendContactEmail(payload);
    await ContactMessage.findByIdAndUpdate(saved._id, { emailSent: true });

    return {
      id: saved._id,
      emailSent: true,
      to: emailResult.to,
      provider: emailResult.provider,
    };
  } catch (error) {
    console.error('Contact email send failed:', error);
    // Message is stored; return soft success so UI unlocks.
    // Client can still show a warning via emailSent: false.
    return {
      id: saved._id,
      emailSent: false,
      to: process.env.MAIL_TO || 'halitaltun002@gmail.com',
      emailError: error.message || 'Failed to send email',
    };
  }
};
