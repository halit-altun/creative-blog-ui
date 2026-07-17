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
  
  console.log('\n📧 SMTP Konfigürasyonu:');
  console.log(`  - Host: ${env.smtp.host || '❌ BULUNAMADI'}`);
  console.log(`  - Port: ${env.smtp.port}`);
  console.log(`  - Secure: ${env.smtp.secure}`);
  console.log(`  - User: ${env.smtp.user || '❌ BULUNAMADI'}`);
  console.log(`  - Pass: ${env.smtp.pass ? '***' + env.smtp.pass.slice(-4) : '❌ BULUNAMADI'}`);
  console.log(`  - From: ${env.smtp.from || '❌ BULUNAMADI'}`);
  console.log(`  - To: ${env.smtp.to || '❌ BULUNAMADI'}`);
  
  if (!env.smtp.user || !env.smtp.pass) {
    console.warn('\n⚠️  UYARI: SMTP bilgileri eksik! Email gönderimi çalışmayacak.');
    console.warn('   Render\'da Environment Variables\'ları kontrol edin.');
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
