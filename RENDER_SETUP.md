# Render Deployment Setup

## Backend Environment Variables

Render Dashboard'da backend servisiniz için aşağıdaki environment variables'ları ekleyin:

### Gerekli Değişkenler:

```
PORT=5000
NODE_ENV=production

# MongoDB
MONGODB_URI=mongodb+srv://halitaltun002_db_user:mGG9UBe9SwnUP5bu@blog-journey.nvriokt.mongodb.net/blog-journey?retryWrites=true&w=majority
MONGODB_DB=blog-journey

# CORS
CORS_ORIGIN=http://localhost:3001,https://halitaltun.netlify.app

# SMTP (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=halitaltun002@gmail.com
SMTP_PASS=gojgbsmeployquti
MAIL_FROM=halitaltun002@gmail.com
MAIL_TO=halitaltun002@gmail.com
```

## Önemli Notlar:

### 1. Gmail App Password Kullanımı
- `SMTP_PASS` değeri Gmail hesabınızın normal şifresi değil, **App Password** olmalıdır
- Gmail App Password oluşturmak için:
  1. Google Account → Security → 2-Step Verification (açık olmalı)
  2. App Passwords → Select app: "Mail" → Select device: "Other (Custom name)"
  3. Oluşan 16 haneli şifreyi `SMTP_PASS` olarak kullanın

### 2. SMTP Port Seçimi
- **Port 587** (STARTTLS): Önerilen - Daha güvenilir
- **Port 465** (SSL): Alternatif - Bazı durumlarda sorun çıkarabilir
- Bu kurulumda Port 587 kullanıyoruz

### 3. Timeout Ayarları
- Frontend: 45 saniye
- Backend: 30 saniye
- Render free tier'da servis uyuyorsa ilk istek yavaş olabilir

### 4. CORS Ayarları
- `CORS_ORIGIN` değerine frontend URL'inizi eklemeyi unutmayın
- Virgül ile ayırarak birden fazla origin ekleyebilirsiniz

## Deployment Sonrası Test

1. Render Dashboard'da Logs'u açın
2. Frontend'den test mesajı gönderin
3. Logs'da şu mesajları göreceksiniz:
   ```
   SMTP Config: { host, port, secure, user, from, to }
   SMTP connection verified
   Contact message saved: <message_id>
   Email sent successfully for message: <message_id>
   ```

## Sorun Giderme

### "Connection timeout" Hatası
- SMTP credentials'ları kontrol edin
- App Password kullandığınızdan emin olun
- Port 587 kullanın

### "Authentication failed" Hatası
- Gmail'de 2-Step Verification açık olmalı
- App Password oluşturulmalı
- SMTP_USER ve SMTP_PASS doğru olmalı

### "Too many contact requests" Hatası
- Rate limit: 15 dakikada maksimum 10 istek
- Biraz bekleyip tekrar deneyin

## Frontend .env (Netlify)

```
VITE_API_URL=https://creative-blog-ui-1.onrender.com
```

Netlify Dashboard → Site settings → Environment variables → Add environment variable

## Test

Yerel ortamda test etmek için:

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

Contact formunu test edin: http://localhost:3001/contact
