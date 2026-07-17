import { getCollection, json } from '../../backend/src/lib/mongoNative.js';
import { sendContactEmail } from '../../backend/src/lib/sendMail.js';

const requiredFields = ['name', 'surname', 'email', 'subject', 'message'];

const parseBody = (event) => {
  if (!event.body) return {};
  try {
    return JSON.parse(event.body);
  } catch {
    return {};
  }
};

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return json(204, {}, 'POST, OPTIONS');
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { message: 'Method not allowed' }, 'POST, OPTIONS');
  }

  try {
    const body = parseBody(event);
    const missing = requiredFields.filter((field) => {
      const value = body?.[field];
      return value === undefined || value === null || String(value).trim() === '';
    });

    if (missing.length) {
      return json(400, { message: 'Validation failed', missing }, 'POST, OPTIONS');
    }

    const payload = {
      name: String(body.name).trim(),
      surname: String(body.surname).trim(),
      email: String(body.email).trim().toLowerCase(),
      subject: String(body.subject).trim(),
      message: String(body.message).trim(),
    };

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      return json(400, { message: 'Invalid email address' }, 'POST, OPTIONS');
    }

    if (payload.message.length < 10) {
      return json(
        400,
        { message: 'Message must be at least 10 characters' },
        'POST, OPTIONS',
      );
    }

    const contacts = await getCollection('contactmessages');
    const insertDoc = {
      ...payload,
      status: 'new',
      emailSent: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await contacts.insertOne(insertDoc);

    const emailResult = await sendContactEmail(payload);
    await contacts.updateOne(
      { _id: result.insertedId },
      { $set: { emailSent: true, updatedAt: new Date() } },
    );

    return json(
      201,
      {
        message: 'Message sent successfully',
        id: result.insertedId,
        emailSent: true,
        to: emailResult.to,
      },
      'POST, OPTIONS',
    );
  } catch (error) {
    console.error('POST /api/mail/send error:', error);
    return json(
      502,
      {
        message: 'Failed to send message',
        error: error?.message || String(error),
      },
      'POST, OPTIONS',
    );
  }
};
