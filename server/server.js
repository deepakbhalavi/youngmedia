const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Database connection helper (cached for serverless invocations)
let isConnected = false;
let lastDbError = null;
const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) return;
  if (!process.env.MONGODB_URI) {
    lastDbError = 'MONGODB_URI is not set in environment variables';
    console.warn('⚠️  MONGODB_URI is not set in environment variables');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    lastDbError = null;
    console.log('✅ MongoDB connected');
    try {
      await require('./seed')();
    } catch (e) {
      console.warn('Seed notice:', e.message);
    }
  } catch (err) {
    lastDbError = err.message;
    console.error('❌ MongoDB connection failed:', err.message);
  }
};

// Global Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check (does not require DB)
app.get('/api/health', async (req, res) => {
  if (!isConnected && process.env.MONGODB_URI) {
    await connectDB();
  }
  res.json({
    status: 'OK',
    message: 'YMMarketing API running',
    dbConnected: mongoose.connection.readyState === 1,
    hasMongoUri: !!process.env.MONGODB_URI,
    mongoUriPrefix: process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 16) + '...' : 'NOT_SET',
    lastDbError
  });
});

// Database connection middleware: runs before all API endpoints
app.use(async (req, res, next) => {
  await connectDB();
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database connection failed. Please ensure MONGODB_URI is added in Vercel Environment Variables (MongoDB Atlas) and IP 0.0.0.0/0 is allowed in Atlas Network Access.'
    });
  }
  next();
});

// API Routes
app.use('/api/auth',         require('./routes/auth'));
app.use('/api/services',     require('./routes/services'));
app.use('/api/portfolio',    require('./routes/portfolio'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/blog',         require('./routes/blog'));
app.use('/api/contact',      require('./routes/contact'));
app.use('/api/settings',     require('./routes/settings'));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Server error' });
});

// Start local listener only when run directly (not inside Vercel serverless)
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  connectDB().then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  });
}

module.exports = app;
