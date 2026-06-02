/**
 * Global Error Middleware
 * Catches all errors passed via next(error) and returns structured JSON responses.
 */

function errorMiddleware(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const isDev = process.env.NODE_ENV === 'development';

  console.error(`[ERROR] ${new Date().toISOString()} - ${err.message}`);

  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error',
    ...(isDev && { stack: err.stack }),
  });
}

module.exports = errorMiddleware;
