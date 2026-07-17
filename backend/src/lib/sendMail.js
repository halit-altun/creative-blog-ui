import nodemailer from 'nodemailer';

const tryMultiplePorts = async (host, user, pass, payload, from, to) => {
  const configurations = [
    { port: 587, secure: false, name: 'STARTTLS (587)' },
    { port: 465, secure: true, name: 'SSL (465)' },
  ];

  for (const config of configurations) {
    try {
      console.log(`\n🔄 Deneniyor: ${config.name}`);
      
      const transporterConfig = {
        host,
        port: config.port,
        secure: config.secure,
        auth: { 
          user, 
          pass,
          type: 'login',
        },
        connectionTimeout: 45000,
        greetingTimeout: 45000,
        socketTimeout: 45000,
        pool: false,
        tls: {
          rejectUnauthorized: false,
          minVersion: 'TLSv1.2',
          ciphers: 'SSLv3',
        },
        requireTLS: !config.secure,
        debug: false,
        logger: false,
      };

      console.log(`  - Port: ${config.port}`);
      console.log(`  - Secure: ${config.secure}`);
      
      const transporter = nodemailer.createTransport(transporterConfig);
      
      console.log('  - Bağlantı doğrulanıyor...');
      await transporter.verify();
      console.log(`  ✓ Bağlantı başarılı!`);

      const fullName = `${payload.name} ${payload.surname}`.trim();
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

      console.log('  - Mail gönderiliyor...');
      const info = await transporter.sendMail(mailOptions);
      console.log(`  ✓ Mail gönderildi! (Message ID: ${info.messageId})`);
      
      transporter.close();
      return { sent: true, messageId: info.messageId, port: config.port };
      
    } catch (error) {
      console.error(`  ✗ ${config.name} başarısız:`, error.message);
      if (config === configurations[configurations.length - 1]) {
        throw error; // Son deneme de başarısız
      }
      console.log('  → Bir sonraki port deneniyor...');
    }
  }
};

export const sendContactEmail = async (payload) => {
  console.log('='.repeat(80));
  console.log('📧 MAIL GÖNDERİM SÜRECİ BAŞLADI');
  console.log('='.repeat(80));
  
  try {
    // Step 1: Environment variables kontrolü
    console.log('\n[1/4] Environment Variables Kontrol Ediliyor...');
    const user = (process.env.SMTP_USER || '').trim();
    const pass = (process.env.SMTP_PASS || '').trim();
    const to = (process.env.MAIL_TO || user).trim();
    const from = (process.env.MAIL_FROM || user).trim();
    const host = (process.env.SMTP_HOST || 'smtp.gmail.com').trim();

    console.log('✓ Environment Variables:');
    console.log(`  - SMTP_HOST: ${host}`);
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

    // Step 2: Gönderen bilgileri
    console.log('\n[2/4] Gönderen Bilgileri:');
    const fullName = `${payload.name} ${payload.surname}`.trim();
    console.log(`  - Ad Soyad: ${fullName}`);
    console.log(`  - Email: ${payload.email}`);
    console.log(`  - Konu: ${payload.subject}`);

    // Step 3: Birden fazla port dene
    console.log('\n[3/4] SMTP Bağlantısı ve Mail Gönderimi...');
    const result = await tryMultiplePorts(host, user, pass, payload, from, to);

    console.log('\n[4/4] Sonuç:');
    console.log(`  ✓ Mail başarıyla gönderildi (Port: ${result.port})`);
    console.log(`  ✓ Message ID: ${result.messageId}`);

    console.log('\n' + '='.repeat(80));
    console.log('✅ MAIL GÖNDERİM SÜRECİ BAŞARIYLA TAMAMLANDI');
    console.log('='.repeat(80) + '\n');

    return { sent: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('\n' + '='.repeat(80));
    console.error('❌ MAIL GÖNDERİM SÜRECİ BAŞARISIZ');
    console.error('='.repeat(80));
    console.error('Hata Detayları:', {
      type: error.constructor.name,
      message: error.message,
      code: error.code,
      command: error.command,
    });
    console.error('='.repeat(80) + '\n');
    
    throw new Error(`Mail gönderimi başarısız: ${error.message}`);
  }
};
