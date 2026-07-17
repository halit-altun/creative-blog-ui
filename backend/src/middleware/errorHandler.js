export const notFoundHandler = (_req, res) => {
  res.status(404).json({ message: 'Route not found' });
};

export const errorHandler = (err, _req, res, _next) => {
  console.error(err);

  const status = err.statusCode || err.status || 500;
  res.status(status).json({
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV !== 'production' && err.stack
      ? { stack: err.stack }
      : {}),
  });
};
