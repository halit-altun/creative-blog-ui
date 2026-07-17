import nodemailer from 'nodemailer';

export const sendContactEmail = async (payload) => {
  console.log('='.repeat(80));
  console.log('📧 MAIL GÖNDERİM SÜRECİ BAŞLADI');
  console.log('='.repeat(80));
  
  try {
    // Step 1: Environment variables kontrolü
    console.log('\n[1/6] Environment Variables Kontrol Ediliyor...');
    const user = (process.env.SMTP_USER || '').trim();
    const pass = (process.env.SMTP_PASS || '').trim();
    const to = (process.env.MAIL_TO || user).trim();
    const from = (process.env.MAIL_FROM || user).trim();
    const host = (process.env.SMTP_HOST || 'smtp.gmail.com').trim();
    const port = Number(process.env.SMTP_PORT) || 587;
    const secure = port === 465;

    console.log('✓ Environment Variables:');
    console.log(`  - SMTP_HOST: ${host}`);
    console.log(`  - SMTP_PORT: ${port}`);
    console.log(`  - SMTP_SECURE: ${secure}`);
    console.log(`  - SMTP_USER: ${user ? user : '❌ BULUNAMADI'}`);
    console.log(`  - SMTP_PASS: ${pass ? '***' + pass.slice(-4) : '❌ BULUNAMADI'}`);
    console.log(`  - MAIL_FROM: ${from}`);
    console.log(`  - MAIL_TO: ${to}`);

    if (!user || !pass || !to) {
      const missing = [];
      if (!user) missing.push('SMTP_USER');
      if (!pass) missing.push('SMTP_PASS');
      if (!to) missing.push('MAIL_TO');
      console.error(`❌ Eksik environment variables: ${missing.join(', ')}`);
      throw new Error(`Eksik environment variables: ${missing.join(', ')}`);
    }

    // Step 2: Transporter oluşturma
    console.log('\n[2/6] SMTP Transporter Oluşturuluyor...');
    const transporterConfig = {
      host,
      port,
      secure,
      auth: { user, pass },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      tls: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2',
      },
      debug: true, // SMTP debug modu
      logger: true, // SMTP logger
    };
    
    console.log('✓ Transporter Config:', {
      host: transporterConfig.host,
      port: transporterConfig.port,
      secure: transporterConfig.secure,
      user: transporterConfig.auth.user,
      timeout: transporterConfig.connectionTimeout,
    });

    const transporter = nodemailer.createTransport(transporterConfig);

    // Step 3: SMTP bağlantısı doğrulama
    console.log('\n[3/6] SMTP Bağlantısı Doğrulanıyor...');
    const verifyStart = Date.now();
    
    try {
      await transporter.verify();
      const verifyDuration = Date.now() - verifyStart;
      console.log(`✓ SMTP bağlantısı başarılı (${verifyDuration}ms)`);
    } catch (verifyError) {
      console.error('❌ SMTP Verify Hatası:', {
        message: verifyError.message,
        code: verifyError.code,
        command: verifyError.command,
        response: verifyError.response,
      });
      throw verifyError;
    }

    // Step 4: Mail içeriği hazırlama
    console.log('\n[4/6] Mail İçeriği Hazırlanıyor...');
    const fullName = `${payload.name} ${payload.surname}`.trim();
    
    console.log('✓ Gönderen Bilgileri:');
    console.log(`  - Ad Soyad: ${fullName}`);
    console.log(`  - Email: ${payload.email}`);
    console.log(`  - Konu: ${payload.subject}`);
    console.log(`  - Mesaj Uzunluğu: ${payload.message.length} karakter`);

    const mailOptions = {
      from: `"DevJourney Contact" <${from}>`,
      to,
      replyTo: payload.email,
      subject: `[DevJourney Contact] ${payload.subject}`,
      text: [
        `Name: ${fullName}`,
        `Email: ${payload.email}`,
        `Subject: ${payload.subject}`,
        '',
        payload.message,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #4C00FF; margin-bottom: 20px;">Yeni İletişim Mesajı</h2>
            <p><strong>Ad Soyad:</strong> ${fullName}</p>
            <p><strong>E-posta:</strong> ${payload.email}</p>
            <p><strong>Konu:</strong> ${payload.subject}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p><strong>Mesaj:</strong></p>
            <p style="white-space: pre-wrap;">${payload.message}</p>
          </div>
        </div>
      `,
    };

    console.log('✓ Mail Options:');
    console.log(`  - From: ${mailOptions.from}`);
    console.log(`  - To: ${mailOptions.to}`);
    console.log(`  - Reply-To: ${mailOptions.replyTo}`);
    console.log(`  - Subject: ${mailOptions.subject}`);

    // Step 5: Mail gönderme
    console.log('\n[5/6] Mail Gönderiliyor...');
    const sendStart = Date.now();
    
    try {
      const info = await transporter.sendMail(mailOptions);
      const sendDuration = Date.now() - sendStart;
      
      console.log(`✓ Mail başarıyla gönderildi (${sendDuration}ms)`);
      console.log('  - Message ID:', info.messageId);
      console.log('  - Response:', info.response);
      console.log('  - Accepted:', info.accepted);
      console.log('  - Rejected:', info.rejected);

      // Step 6: Transporter'ı kapat
      console.log('\n[6/6] Transporter Kapatılıyor...');
      transporter.close();
      console.log('✓ Transporter kapatıldı');

      console.log('\n' + '='.repeat(80));
      console.log('✅ MAIL GÖNDERİM SÜRECİ BAŞARIYLA TAMAMLANDI');
      console.log('='.repeat(80) + '\n');

      return { sent: true, messageId: info.messageId };
    } catch (sendError) {
      console.error('\n❌ Mail Gönderim Hatası:', {
        message: sendError.message,
        code: sendError.code,
        command: sendError.command,
        responseCode: sendError.responseCode,
        response: sendError.response,
      });
      throw sendError;
    }
    
  } catch (error) {
    console.error('\n' + '='.repeat(80));
    console.error('❌ MAIL GÖNDERİM SÜRECİ BAŞARISIZ');
    console.error('='.repeat(80));
    console.error('Hata Detayları:', {
      type: error.constructor.name,
      message: error.message,
      code: error.code,
      command: error.command,
      responseCode: error.responseCode,
      response: error.response,
      stack: error.stack,
    });
    console.error('='.repeat(80) + '\n');
    
    throw new Error(`Mail gönderimi başarısız: ${error.message}`);
  }
};
