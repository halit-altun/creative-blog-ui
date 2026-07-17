import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

const start = async () => {
  console.log('\n' + '='.repeat(80));
  console.log('🚀 BACKEND SUNUCU BAŞLATILIYOR');
  console.log('='.repeat(80));
  
  console.log('\n📋 Ortam Bilgileri:');
  console.log(`  - NODE_ENV: ${env.nodeEnv}`);
  console.log(`  - PORT: ${env.port}`);
  
  console.log('\n📧 Gmail API Konfigürasyonu (OAuth2 / HTTPS):');
  console.log(`  - Client ID: ${env.gmail.clientId ? '✓ mevcut' : '❌ BULUNAMADI'}`);
  console.log(`  - Client Secret: ${env.gmail.clientSecret ? '✓ mevcut' : '❌ BULUNAMADI'}`);
  console.log(`  - Refresh Token: ${env.gmail.refreshToken ? '✓ mevcut' : '❌ BULUNAMADI'}`);
  console.log(`  - From: ${env.gmail.from || '❌ BULUNAMADI'}`);
  console.log(`  - To: ${env.gmail.to || '❌ BULUNAMADI'}`);

  if (!env.gmail.clientId || !env.gmail.clientSecret || !env.gmail.refreshToken) {
    console.warn('\n⚠️  UYARI: Gmail API bilgileri eksik! Email gönderimi çalışmayacak.');
    console.warn('   `npm run gmail:auth` ile refresh token oluşturup Render\'da Environment');
    console.warn('   Variables\'a ekleyin (bkz. RENDER_SETUP.md).');
  }
  
  console.log('\n🔗 CORS Origin:');
  console.log(`  - ${JSON.stringify(env.corsOrigin)}`);
  
  console.log('\n💾 MongoDB Bağlantısı Kuruluyor...');
  await connectDB();
  console.log('✓ MongoDB bağlantısı başarılı');
  
  app.listen(env.port, () => {
    console.log('\n' + '='.repeat(80));
    console.log(`✅ API SUNUCU HAZIR: http://localhost:${env.port}`);
    console.log('='.repeat(80) + '\n');
  });
};

start().catch((error) => {
  console.error('\n' + '='.repeat(80));
  console.error('❌ BACKEND BAŞLATMA HATASI');
  console.error('='.repeat(80));
  console.error(error);
  console.error('='.repeat(80) + '\n');
  process.exit(1);
});
