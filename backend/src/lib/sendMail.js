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
      
      // Gmail SMTP ile uyumlu replyTo ayarı
      // Eğer payload.email güvenilir bir domain'den değilse, sadece içerikte göster
      const mailOptions = {
        from: `"DevJourney Contact" <${from}>`, // Sabit: halitaltun002@gmail.com
        to, // Sabit: halitaltun002@gmail.com
        // replyTo alanını kaldırdık - Gmail SMTP ile sorun çıkarmasın
        subject: `[DevJourney Contact] ${payload.subject}`,
        text: [
          `İLETİŞİM TALEP EDEN KİŞİ:`,
          `─────────────────────────`,
          `İsim: ${fullName}`,
          `Email: ${payload.email}`,
          ``,
          `KONU: ${payload.subject}`,
          `─────────────────────────`,
          ``,
          `MESAJ:`,
          payload.message,
          ``,
          `─────────────────────────`,
          `Bu kişiye cevap vermek için: ${payload.email}`,
        ].join('\n'),
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #4C00FF; margin-bottom: 20px; border-bottom: 3px solid #4C00FF; padding-bottom: 10px;">
                📬 Yeni İletişim Talebi
              </h2>
              
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; margin-bottom: 20px; color: white;">
                <h3 style="color: white; font-size: 18px; margin: 0 0 15px 0;">👤 İLETİŞİME GEÇMEK İSTEYEN KİŞİ</h3>
                <div style="background-color: rgba(255,255,255,0.1); padding: 15px; border-radius: 5px;">
                  <p style="margin: 8px 0; font-size: 15px;"><strong>👤 İsim:</strong> ${fullName}</p>
                  <p style="margin: 8px 0; font-size: 16px; background-color: rgba(255,255,255,0.2); padding: 10px; border-radius: 5px;">
                    <strong>📧 Email Adresi:</strong><br>
                    <a href="mailto:${payload.email}" style="color: #FFD700; text-decoration: none; font-size: 18px; font-weight: bold;">${payload.email}</a>
                  </p>
                </div>
              </div>

              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #4C00FF; margin-bottom: 20px;">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">📋 Konu</p>
                <p style="margin: 0; font-size: 18px; font-weight: bold; color: #333;">${payload.subject}</p>
              </div>

              <div style="background-color: white; padding: 20px; border: 2px solid #e0e0e0; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 0 0 15px 0; font-size: 14px; color: #666; font-weight: bold;">💬 MESAJ İÇERİĞİ</p>
                <div style="background-color: #fafafa; padding: 15px; border-radius: 5px;">
                  <p style="white-space: pre-wrap; color: #333; line-height: 1.8; margin: 0; font-size: 15px;">${payload.message}</p>
                </div>
              </div>

              <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 20px; border-radius: 8px; text-align: center;">
                <p style="margin: 0 0 10px 0; color: white; font-size: 14px; font-weight: bold;">
                  ⚡ HEMEN CEVAP VER
                </p>
                <a href="mailto:${payload.email}?subject=Re: ${encodeURIComponent(payload.subject)}" 
                   style="display: inline-block; background-color: white; color: #f5576c; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  📧 ${payload.email} adresine cevap gönder
                </a>
              </div>

              <div style="margin-top: 30px; padding: 15px; background-color: #f0f0f0; border-radius: 8px; border-top: 3px solid #4C00FF;">
                <p style="margin: 0; font-size: 12px; color: #666; text-align: center;">
                  ℹ️ Bu mesaj <strong>halitaltun.netlify.app</strong> iletişim formundan gönderildi<br>
                  Gönderen: <strong>${payload.email}</strong> | Tarih: ${new Date().toLocaleString('tr-TR')}
                </p>
              </div>
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
