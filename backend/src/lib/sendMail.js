import nodemailer from 'nodemailer';

export const sendContactEmail = async (payload) => {
  try {
    const user = (process.env.SMTP_USER || '').trim();
    const pass = (process.env.SMTP_PASS || '').trim();
    const to = (process.env.MAIL_TO || user).trim();
    const from = (process.env.MAIL_FROM || user).trim();
    const host = (process.env.SMTP_HOST || 'smtp.gmail.com').trim();
    const port = Number(process.env.SMTP_PORT) || 587;
    const secure = port === 465;

    if (!user || !pass || !to) {
      throw new Error('SMTP_USER / SMTP_PASS / MAIL_TO missing on Render');
    }

    console.log('SMTP Config:', { host, port, secure, user, from, to });

    const transporter = nodemailer.createTransport({
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
    });

    // Verify connection
    await transporter.verify();
    console.log('SMTP connection verified');

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

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return { sent: true, messageId: info.messageId };
  } catch (error) {
    console.error('SMTP Error Details:', {
      message: error.message,
      code: error.code,
      command: error.command,
      responseCode: error.responseCode,
      response: error.response,
    });
    
    throw new Error(`Mail gönderimi başarısız: ${error.message}`);
  }
};
