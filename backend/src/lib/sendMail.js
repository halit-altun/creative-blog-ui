import { google } from 'googleapis';

/**
 * Render'ın ücretsiz planı SMTP portlarını (25/465/587) tamamen engelliyor,
 * bu yüzden Gmail'e klasik SMTP ile bağlanmak mümkün değil.
 * Bunun yerine Google'ın resmi Gmail REST API'sini (HTTPS, port 443) kullanıyoruz.
 * Kimlik doğrulama OAuth2 refresh token ile yapılır; bkz. src/scripts/getGmailRefreshToken.js
 */

const encodeSubject = (subject) =>
  `=?UTF-8?B?${Buffer.from(subject, 'utf-8').toString('base64')}?=`;

const buildRawMessage = ({ from, to, subject, text, html }) => {
  const boundary = `mixed_${Date.now()}_${Math.random().toString(36).slice(2)}`;

  const lines = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${encodeSubject(subject)}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    Buffer.from(text, 'utf-8').toString('base64'),
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    Buffer.from(html, 'utf-8').toString('base64'),
    '',
    `--${boundary}--`,
  ];

  return Buffer.from(lines.join('\r\n'), 'utf-8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const getGmailClient = () => {
  const clientId = (process.env.GMAIL_CLIENT_ID || '').trim();
  const clientSecret = (process.env.GMAIL_CLIENT_SECRET || '').trim();
  const refreshToken = (process.env.GMAIL_REFRESH_TOKEN || '').trim();
  const redirectUri = (
    process.env.GMAIL_REDIRECT_URI || 'https://developers.google.com/oauthplayground'
  ).trim();

  const missing = [];
  if (!clientId) missing.push('GMAIL_CLIENT_ID');
  if (!clientSecret) missing.push('GMAIL_CLIENT_SECRET');
  if (!refreshToken) missing.push('GMAIL_REFRESH_TOKEN');

  if (missing.length) {
    throw new Error(`Eksik Gmail API environment variables: ${missing.join(', ')}`);
  }

  const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
  oAuth2Client.setCredentials({ refresh_token: refreshToken });

  return google.gmail({ version: 'v1', auth: oAuth2Client });
};

const buildMailContent = (payload, from) => {
  const fullName = `${payload.name} ${payload.surname}`.trim();

  const text = [
    'İLETİŞİM TALEP EDEN KİŞİ:',
    '─────────────────────────',
    `İsim: ${fullName}`,
    `Email: ${payload.email}`,
    '',
    `KONU: ${payload.subject}`,
    '─────────────────────────',
    '',
    'MESAJ:',
    payload.message,
    '',
    '─────────────────────────',
    `Bu kişiye cevap vermek için: ${payload.email}`,
  ].join('\n');

  const html = `
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
          <p style="margin: 0 0 10px 0; color: white; font-size: 14px; font-weight: bold;">⚡ HEMEN CEVAP VER</p>
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
  `;

  return {
    from: `"DevJourney Contact" <${from}>`,
    subject: `[DevJourney Contact] ${payload.subject}`,
    text,
    html,
  };
};

export const sendContactEmail = async (payload) => {
  console.log('='.repeat(80));
  console.log('📧 MAIL GÖNDERİM SÜRECİ BAŞLADI (Gmail API / HTTPS)');
  console.log('='.repeat(80));

  try {
    console.log('\n[1/4] Environment Variables Kontrol Ediliyor...');
    const to = (process.env.MAIL_TO || process.env.GMAIL_USER || '').trim();
    const from = (process.env.MAIL_FROM || process.env.GMAIL_USER || to).trim();

    console.log(`  - MAIL_FROM: ${from || '❌ BULUNAMADI'}`);
    console.log(`  - MAIL_TO: ${to || '❌ BULUNAMADI'}`);
    console.log(`  - GMAIL_CLIENT_ID: ${process.env.GMAIL_CLIENT_ID ? '✓ mevcut' : '❌ BULUNAMADI'}`);
    console.log(`  - GMAIL_CLIENT_SECRET: ${process.env.GMAIL_CLIENT_SECRET ? '✓ mevcut' : '❌ BULUNAMADI'}`);
    console.log(`  - GMAIL_REFRESH_TOKEN: ${process.env.GMAIL_REFRESH_TOKEN ? '✓ mevcut' : '❌ BULUNAMADI'}`);

    if (!to || !from) {
      throw new Error('Eksik environment variables: MAIL_TO / MAIL_FROM');
    }

    console.log('\n[2/4] Gmail API İstemcisi Oluşturuluyor...');
    const gmail = getGmailClient();
    console.log('✓ OAuth2 istemcisi hazır');

    console.log('\n[3/4] Mail İçeriği Hazırlanıyor...');
    const fullName = `${payload.name} ${payload.surname}`.trim();
    console.log(`  - İsim: ${fullName}`);
    console.log(`  - Gelen Email (bilgi amaçlı): ${payload.email}`);
    console.log(`  - Konu: ${payload.subject}`);

    const { from: fromHeader, subject, text, html } = buildMailContent(payload, from);
    const raw = buildRawMessage({ from: fromHeader, to, subject, text, html });

    console.log('\n[4/4] Gmail API üzerinden Mail Gönderiliyor (HTTPS)...');
    const sendStart = Date.now();

    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw },
    });

    const sendDuration = Date.now() - sendStart;
    console.log(`✓ Mail başarıyla gönderildi (${sendDuration}ms)`);
    console.log(`  - Message ID: ${response.data.id}`);
    console.log(`  - Thread ID: ${response.data.threadId}`);

    console.log('\n' + '='.repeat(80));
    console.log('✅ MAIL GÖNDERİM SÜRECİ BAŞARIYLA TAMAMLANDI');
    console.log('='.repeat(80) + '\n');

    return { sent: true, messageId: response.data.id };
  } catch (error) {
    const apiError = error?.response?.data?.error;

    console.error('\n' + '='.repeat(80));
    console.error('❌ MAIL GÖNDERİM SÜRECİ BAŞARISIZ');
    console.error('='.repeat(80));
    console.error('Hata Detayları:', {
      message: error.message,
      code: error.code,
      apiError,
    });
    console.error('='.repeat(80) + '\n');

    const detail = apiError?.message || error.message;
    throw new Error(`Mail gönderimi başarısız: ${detail}`);
  }
};
