/**
 * Dad Jokes App - Backend Server
 * Entry point: initializes Express server with middlewares and routes
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const jokeRoutes = require('./routes/jokeRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const requestLogger = require('./middlewares/requestLogger');

const app = express();
// Force CORS headers em todas as respostas
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
const PORT = process.env.PORT || 3001;

// ─── Middlewares ─────────────────────────────────────────────────────────────

// CORS: allow only the frontend origin
app.use(cors({
  origin: '*',
  methods: ['GET'],
}));

// Parse JSON bodies
app.use(express.json());

// HTTP request logger (dev format: colored, concise)
app.use(morgan('dev'));

// Custom request logger middleware (logs to console with timestamp)
app.use(requestLogger);

// ─── Routes ──────────────────────────────────────────────────────────────────

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'dad-jokes-backend',
  });
});

// Joke routes: /api/jokes/*
app.use('/api/jokes', jokeRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.originalUrl,
  });
});

// Global error handler (must be last)
app.use(errorMiddleware);

// ─── Start Server ─────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`\n🎭 Dad Jokes Backend running on http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✅ Health check: http://localhost:${PORT}/health\n`);
});

module.exports = app;
