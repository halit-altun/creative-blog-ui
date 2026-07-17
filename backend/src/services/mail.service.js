import ContactMessage from '../models/ContactMessage.js';
import { sendContactEmail } from '../lib/sendMail.js';

export const handleContactSubmission = async (payload) => {
  const saved = await ContactMessage.create(payload);

  await sendContactEmail(payload);
  await ContactMessage.findByIdAndUpdate(saved._id, { emailSent: true });

  return {
    id: saved._id,
    emailSent: true,
  };
};
