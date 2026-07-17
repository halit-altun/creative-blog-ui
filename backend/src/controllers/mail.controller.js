import * as mailService from '../services/mail.service.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

export const sendMail = asyncHandler(async (req, res) => {
  const result = await mailService.handleContactSubmission(req.body);

  res.status(201).json({
    message: 'Message sent successfully',
    ...result,
  });
});
