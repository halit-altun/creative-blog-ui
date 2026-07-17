const requiredFields = ['name', 'surname', 'email', 'subject', 'message'];

export const validateMailPayload = (req, res, next) => {
  const missing = requiredFields.filter((field) => {
    const value = req.body?.[field];
    return value === undefined || value === null || String(value).trim() === '';
  });

  if (missing.length) {
    return res.status(400).json({
      message: 'Validation failed',
      missing,
    });
  }

  const email = String(req.body.email).trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  if (String(req.body.message).trim().length < 10) {
    return res.status(400).json({ message: 'Message must be at least 10 characters' });
  }

  req.body = {
    name: String(req.body.name).trim(),
    surname: String(req.body.surname).trim(),
    email,
    subject: String(req.body.subject).trim(),
    message: String(req.body.message).trim(),
  };

  return next();
};
