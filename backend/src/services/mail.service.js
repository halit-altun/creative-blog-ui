import ContactMessage from '../models/ContactMessage.js';

export const saveContactMessage = async (payload) => {
  const doc = await ContactMessage.create(payload);
  return doc.toObject();
};

export const handleContactSubmission = async (payload) => {
  const saved = await saveContactMessage(payload);

  return {
    id: saved._id,
    saved: true,
    emailSent: false,
    note: 'Email is delivered from the frontend via FormSubmit',
  };
};
