import ContactMessage from '../models/ContactMessage.js';
import { sendContactEmail } from '../lib/sendMail.js';

export const saveContactMessage = async (payload) => {
  const doc = await ContactMessage.create(payload);
  return doc.toObject();
};

export const handleContactSubmission = async (payload) => {
  const saved = await saveContactMessage(payload);

  await sendContactEmail(payload);
  await ContactMessage.findByIdAndUpdate(saved._id, { emailSent: true });

  return {
    id: saved._id,
    emailSent: true,
  };
};
