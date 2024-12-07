import express from 'express';
import { sendMail, getAllMails, getMailById } from '../controllers/mailController.js';

const router = express.Router();

router.post('/send', sendMail);
router.get('/', getAllMails);
router.get('/:id', getMailById);

export default router;
