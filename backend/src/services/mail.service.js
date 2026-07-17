import ContactMessage from '../models/ContactMessage.js';

export const saveContactMessage = async (payload) => {
  const doc = await ContactMessage.create({
    ...payload,
    emailSent: true,
  });
  return doc.toObject();
};

/** Frontend delivers email via Web3Forms; backend only persists the message. */
export const handleContactSubmission = async (payload) => {
  const saved = await saveContactMessage(payload);

  return {
    id: saved._id,
    emailSent: true,
    saved: true,
  };
};
