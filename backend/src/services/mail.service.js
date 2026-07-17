import ContactMessage from '../models/ContactMessage.js';
import { sendContactEmail } from '../lib/sendMail.js';

export const handleContactSubmission = async (payload) => {
  console.log('\n🔵 Contact Submission Handler Başladı');
  console.log('📥 Gelen Payload:', {
    name: payload.name,
    surname: payload.surname,
    email: payload.email,
    subject: payload.subject,
    messageLength: payload.message?.length,
  });

  try {
    // Step 1: Mesajı veritabanına kaydet
    console.log('\n[1/3] Mesaj MongoDB\'ye kaydediliyor...');
    const saveStart = Date.now();
    
    const saved = await ContactMessage.create(payload);
    const saveDuration = Date.now() - saveStart;
    
    console.log(`✓ Mesaj başarıyla kaydedildi (${saveDuration}ms)`);
    console.log('  - Message ID:', saved._id);
    console.log('  - Timestamp:', saved.createdAt);

    let emailSent = false;
    let emailError = null;

    // Step 2: Email göndermeyi dene
    console.log('\n[2/3] Email gönderimi başlatılıyor...');
    const emailStart = Date.now();
    
    try {
      await sendContactEmail(payload);
      const emailDuration = Date.now() - emailStart;
      
      emailSent = true;
      console.log(`✓ Email başarıyla gönderildi (${emailDuration}ms)`);
      
      // Step 3: Email durumunu güncelle
      console.log('\n[3/3] Mesaj emailSent=true olarak güncelleniyor...');
      await ContactMessage.findByIdAndUpdate(saved._id, { 
        emailSent: true,
        emailError: null,
      });
      console.log('✓ Mesaj güncellendi');
      
      console.log('\n✅ Contact Submission Handler Başarıyla Tamamlandı\n');
    } catch (emailErr) {
      const emailDuration = Date.now() - emailStart;
      
      console.error(`\n❌ Email gönderimi başarısız (${emailDuration}ms)`);
      console.error('Email Hatası:', {
        message: emailErr.message,
        stack: emailErr.stack,
      });
      
      emailError = emailErr.message;
      emailSent = false;
      
      // Email gönderilemedi ama mesaj kaydedildi
      console.log('\n[3/3] Mesaj emailSent=false olarak güncelleniyor...');
      await ContactMessage.findByIdAndUpdate(saved._id, { 
        emailSent: false,
        emailError: emailErr.message,
      });
      console.log('✓ Mesaj güncellendi (email error kaydedildi)');
      
      console.log('\n⚠️  Contact Submission Handler Tamamlandı (Email Başarısız)\n');
    }

    return {
      id: saved._id,
      emailSent,
      emailError,
    };
  } catch (error) {
    console.error('\n❌ Contact Submission Handler Hatası:');
    console.error('Hata:', {
      message: error.message,
      stack: error.stack,
    });
    console.error('');
    throw error;
  }
};
