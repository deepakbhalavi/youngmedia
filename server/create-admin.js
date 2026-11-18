const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function createAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);
  const User = require('./models/User');
  const existing = await User.findOne({ email: 'admin@ymmarketing.com' });
  if (existing) {
    existing.password = 'ymmarketing@2024';
    await existing.save();
    console.log('Admin password reset');
  } else {
    await User.create({ name: 'Yash Mandale', email: 'admin@ymmarketing.com', password: 'ymmarketing@2024', role: 'admin' });
    console.log('Admin created');
  }
  await mongoose.disconnect();
}

createAdmin().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
