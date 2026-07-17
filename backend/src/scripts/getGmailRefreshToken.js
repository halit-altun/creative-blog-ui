import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { google } from 'googleapis';

/**
 * TEK SEFERLİK KURULUM SCRIPTİ
 * Gmail API üzerinden mail göndermek için gereken GMAIL_REFRESH_TOKEN'ı üretir.
 *
 * Kullanım:
 *   1) Google Cloud Console'da bir proje oluşturun, Gmail API'yi etkinleştirin
 *      ve "OAuth client ID" -> "Desktop app" türünde bir kimlik bilgisi oluşturun.
 *   2) backend/.env dosyasına GMAIL_CLIENT_ID ve GMAIL_CLIENT_SECRET değerlerini ekleyin.
 *   3) Bu scripti çalıştırın:  npm run gmail:auth
 *   4) Açılan linki tarayıcıda açın, kendi Gmail hesabınızla giriş yapıp izin verin.
 *   5) Terminalde yazdırılan GMAIL_REFRESH_TOKEN değerini .env dosyanıza
 *      (ve Render Environment Variables'a) ekleyin.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const PORT = 53682;
const REDIRECT_URI = `http://localhost:${PORT}`;
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

const clientId = (process.env.GMAIL_CLIENT_ID || '').trim();
const clientSecret = (process.env.GMAIL_CLIENT_SECRET || '').trim();

if (!clientId || !clientSecret) {
  console.error('\n❌ GMAIL_CLIENT_ID ve/veya GMAIL_CLIENT_SECRET bulunamadı.');
  console.error('   Lütfen backend/.env dosyasına bu değerleri ekleyip tekrar deneyin.\n');
  process.exit(1);
}

const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, REDIRECT_URI);

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: SCOPES,
});

console.log('\n' + '='.repeat(80));
console.log('🔑 GMAIL REFRESH TOKEN OLUŞTURMA');
console.log('='.repeat(80));
console.log('\n1) Aşağıdaki linki tarayıcınızda açın:\n');
console.log(authUrl);
console.log('\n2) Mail göndermek istediğiniz Gmail hesabıyla giriş yapın ve izin verin.');
console.log('3) Yönlendirme sonrası bu terminale otomatik olarak dönülecek...\n');

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, REDIRECT_URI);
    const code = url.searchParams.get('code');

    if (!code) {
      res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h2>Kod bulunamadı. Lütfen tekrar deneyin.</h2>');
      return;
    }

    const { tokens } = await oAuth2Client.getToken({ code, redirect_uri: REDIRECT_URI });

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h2>✅ Başarılı! Bu sekmeyi kapatıp terminale dönebilirsiniz.</h2>');

    console.log('\n' + '='.repeat(80));
    console.log('✅ REFRESH TOKEN BAŞARIYLA ALINDI');
    console.log('='.repeat(80));
    console.log('\nAşağıdaki satırları backend/.env dosyanıza VE Render Environment');
    console.log('Variables kısmına ekleyin:\n');
    console.log(`GMAIL_CLIENT_ID=${clientId}`);
    console.log(`GMAIL_CLIENT_SECRET=${clientSecret}`);
    console.log(`GMAIL_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log('\n' + '='.repeat(80) + '\n');

    if (!tokens.refresh_token) {
      console.warn('⚠️  refresh_token dönmedi. Google hesabınızda bu uygulamaya daha önce');
      console.warn('   izin vermiş olabilirsiniz. https://myaccount.google.com/permissions');
      console.warn('   adresinden "DevJourney" / uygulamanızın erişimini kaldırıp tekrar deneyin.\n');
    }

    server.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Token alınırken hata oluştu:', error.message);
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h2>Hata oluştu, terminale bakın.</h2>');
    server.close();
    process.exit(1);
  }
});

server.listen(PORT, () => {
  console.log(`(Yerel doğrulama sunucusu http://localhost:${PORT} üzerinde bekliyor...)\n`);
});
