import * as mailService from '../services/mail.service.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

export const sendMail = asyncHandler(async (req, res) => {
  console.log('\n🟢 POST /api/mail/send - İstek Alındı');
  console.log('Request Headers:', {
    'content-type': req.headers['content-type'],
    'user-agent': req.headers['user-agent'],
    origin: req.headers.origin,
  });
  console.log('Request Body:', req.body);
  
  const requestStart = Date.now();
  
  const result = await mailService.handleContactSubmission(req.body);
  
  const requestDuration = Date.now() - requestStart;
  
  console.log(`\n✅ Response Hazırlandı (${requestDuration}ms):`, {
    id: result.id,
    emailSent: result.emailSent,
    emailError: result.emailError || null,
  });

  res.status(201).json({
    message: 'Message sent successfully',
    id: result.id,
    emailSent: result.emailSent,
    emailError: result.emailError || undefined,
  });
  
  console.log('✅ Response Gönderildi\n');
});
