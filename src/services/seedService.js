import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    // আগে থেকে কোনো admin আছে কিনা চেক করো
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });

    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin.email);
      console.log('Use /api/auth/change-password to update your password.');
      process.exit(0);
    }

    // নতুন Admin তৈরি করো
    const admin = await User.create({
      name: process.env.ADMIN_NAME || 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
      password: process.env.ADMIN_PASSWORD || 'admin123456',
      role: 'admin',
    });

    console.log('Admin user created successfully!');
    console.log('   Name  :', admin.name);
    console.log('   Email :', admin.email);
    console.log('   Role  :', admin.role);
    console.log('Now login at POST /api/auth/login');

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seedAdmin();
