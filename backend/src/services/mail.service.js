import ContactMessage from '../models/ContactMessage.js';
import { sendContactEmail } from '../lib/sendMail.js';

export const saveContactMessage = async (payload) => {
  const doc = await ContactMessage.create(payload);
  return doc.toObject();
};

export const handleContactSubmission = async (payload) => {
  const saved = await saveContactMessage(payload);

  try {
    await sendContactEmail(payload);
    await ContactMessage.findByIdAndUpdate(saved._id, { emailSent: true });

    return {
      id: saved._id,
      emailSent: true,
    };
  } catch (error) {
    console.error('Contact email send failed:', error);
    const err = new Error(error.message || 'Failed to send email');
    err.statusCode = 502;
    err.contactId = saved._id;
    throw err;
  }
};
