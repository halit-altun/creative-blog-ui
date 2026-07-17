import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as mailController from '../controllers/mail.controller.js';
import { validateMailPayload } from '../middleware/validateMail.js';

const router = Router();

const mailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many contact requests. Please try again later.' },
});

router.post('/send', mailLimiter, validateMailPayload, mailController.sendMail);

export default router;
