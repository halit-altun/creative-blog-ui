import ContactMessage from '../models/ContactMessage.js';
import { sendContactEmail } from '../lib/sendMail.js';

export const handleContactSubmission = async (payload) => {
  try {
    // Önce mesajı kaydet
    const saved = await ContactMessage.create(payload);
    console.log('Contact message saved:', saved._id);

    let emailSent = false;
    let emailError = null;

    try {
      // Email göndermeyi dene
      await sendContactEmail(payload);
      emailSent = true;
      console.log('Email sent successfully for message:', saved._id);
      
      // Email gönderildi olarak işaretle
      await ContactMessage.findByIdAndUpdate(saved._id, { emailSent: true });
    } catch (emailErr) {
      console.error('Email sending failed, but message saved:', emailErr.message);
      emailError = emailErr.message;
      emailSent = false;
      
      // Email gönderilemedi ama mesaj kaydedildi
      await ContactMessage.findByIdAndUpdate(saved._id, { 
        emailSent: false,
        emailError: emailErr.message 
      });
    }

    return {
      id: saved._id,
      emailSent,
      emailError,
    };
  } catch (error) {
    console.error('Contact submission error:', error);
    throw error;
  }
};
