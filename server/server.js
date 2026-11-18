const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth',         require('./routes/auth'));
app.use('/api/services',     require('./routes/services'));
app.use('/api/portfolio',    require('./routes/portfolio'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/blog',         require('./routes/blog'));
app.use('/api/contact',      require('./routes/contact'));
app.use('/api/settings',     require('./routes/settings'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'YMMarketing API running' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Server error' });
});

// Database connection helper (cached for serverless invocations)
let isConnected = false;
const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) return;
  if (!process.env.MONGODB_URI) {
    console.warn('⚠️  MONGODB_URI is not set in environment variables');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('✅ MongoDB connected');
    try {
      require('./seed')();
    } catch (e) {
      // Seed runs once if DB is empty
    }
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
  }
};

// Middleware: ensure DB connection is ready before handling API requests
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Start local listener only when run directly (not inside Vercel serverless)
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  connectDB().then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  });
}

module.exports = app;
