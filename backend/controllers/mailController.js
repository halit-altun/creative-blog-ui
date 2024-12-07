import nodemailer from 'nodemailer';
import logger from '../utils/logger.js';
import Mail from '../models/Mail.js';

export const sendMail = async (req, res) => {
  try {
    const { name, surname, email, message } = req.body;

    // Create mail record in database
    const mailRecord = new Mail({
      name,
      surname,
      email,
      message
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'halitaltun002@gmail.com',
      subject: `New Contact Form Message from ${name} ${surname}`,
      html: `
        <h3>Contact Form Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Surname:</strong> ${surname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    
    // Save the mail record after successful sending
    await mailRecord.save();
    
    logger.info(`Email sent and saved successfully from ${email}`);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    // If email sending fails, save the record with failed status
    try {
      const failedMailRecord = new Mail({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        message: req.body.message,
        status: 'failed'
      });
      await failedMailRecord.save();
    } catch (dbError) {
      logger.error('Error saving failed mail to database:', dbError);
    }

    logger.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
};

// Get all mail records
export const getAllMails = async (req, res) => {
  try {
    const mails = await Mail.find().sort({ createdAt: -1 });
    res.status(200).json(mails);
  } catch (error) {
    logger.error('Error fetching mails:', error);
    res.status(500).json({ message: 'Error fetching mails', error: error.message });
  }
};

// Get mail by ID
export const getMailById = async (req, res) => {
  try {
    const mail = await Mail.findById(req.params.id);
    if (!mail) {
      return res.status(404).json({ message: 'Mail not found' });
    }
    res.status(200).json(mail);
  } catch (error) {
    logger.error('Error fetching mail:', error);
    res.status(500).json({ message: 'Error fetching mail', error: error.message });
  }
};