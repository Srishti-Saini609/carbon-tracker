import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Activity from './models/Activity.js';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const SEED_DATA = [
  // Travel Activities (Last 30 Days)
  { type: 'travel', category: 'car_petrol', value: 45.5, unit: 'km', co2e: 8.74, date: new Date(Date.now() - 86400000 * 1).toISOString() },
  { type: 'travel', category: 'walking', value: 5.2, unit: 'km', co2e: 0, date: new Date(Date.now() - 86400000 * 1).toISOString() },
  { type: 'travel', category: 'cycling', value: 12.0, unit: 'km', co2e: 0, date: new Date(Date.now() - 86400000 * 2).toISOString() },
  { type: 'travel', category: 'bus', value: 25.0, unit: 'km', co2e: 2.23, date: new Date(Date.now() - 86400000 * 2).toISOString() },
  { type: 'travel', category: 'train', value: 150.0, unit: 'km', co2e: 6.15, date: new Date(Date.now() - 86400000 * 3).toISOString() },
  { type: 'travel', category: 'car_diesel', value: 80.0, unit: 'km', co2e: 13.68, date: new Date(Date.now() - 86400000 * 5).toISOString() },
  { type: 'travel', category: 'flight_domestic', value: 850.0, unit: 'km', co2e: 216.75, date: new Date(Date.now() - 86400000 * 8).toISOString() },
  { type: 'travel', category: 'walking', value: 3.5, unit: 'km', co2e: 0, date: new Date(Date.now() - 86400000 * 10).toISOString() },
  { type: 'travel', category: 'bus', value: 18.0, unit: 'km', co2e: 1.60, date: new Date(Date.now() - 86400000 * 12).toISOString() },
  { type: 'travel', category: 'cycling', value: 8.0, unit: 'km', co2e: 0, date: new Date(Date.now() - 86400000 * 15).toISOString() },
  { type: 'travel', category: 'car_petrol', value: 35.0, unit: 'km', co2e: 6.72, date: new Date(Date.now() - 86400000 * 18).toISOString() },
  { type: 'travel', category: 'train', value: 200.0, unit: 'km', co2e: 8.20, date: new Date(Date.now() - 86400000 * 22).toISOString() },
  { type: 'travel', category: 'bus', value: 40.0, unit: 'km', co2e: 3.56, date: new Date(Date.now() - 86400000 * 25).toISOString() },
  { type: 'travel', category: 'walking', value: 6.0, unit: 'km', co2e: 0, date: new Date(Date.now() - 86400000 * 28).toISOString() },
  
  // Energy Activities (Last 30 Days)
  { type: 'energy', category: 'electricity', value: 120.0, unit: 'kWh', co2e: 98.4, date: new Date(Date.now() - 86400000 * 1).toISOString() },
  { type: 'energy', category: 'natural_gas', value: 35.0, unit: 'm³', co2e: 70.0, date: new Date(Date.now() - 86400000 * 4).toISOString() },
  { type: 'energy', category: 'lpg', value: 15.0, unit: 'kg', co2e: 22.5, date: new Date(Date.now() - 86400000 * 7).toISOString() },
  { type: 'energy', category: 'electricity', value: 95.0, unit: 'kWh', co2e: 77.9, date: new Date(Date.now() - 86400000 * 11).toISOString() },
  { type: 'energy', category: 'natural_gas', value: 28.0, unit: 'm³', co2e: 56.0, date: new Date(Date.now() - 86400000 * 16).toISOString() },
  { type: 'energy', category: 'electricity', value: 110.0, unit: 'kWh', co2e: 90.2, date: new Date(Date.now() - 86400000 * 21).toISOString() },
  { type: 'energy', category: 'lpg', value: 12.0, unit: 'kg', co2e: 18.0, date: new Date(Date.now() - 86400000 * 26).toISOString() },
  
  // Diet Activities (Last 30 Days)
  { type: 'diet', category: 'meat_beef', value: 2.5, unit: 'kg', co2e: 67.5, date: new Date(Date.now() - 86400000 * 1).toISOString() },
  { type: 'diet', category: 'meat_chicken', value: 1.8, unit: 'kg', co2e: 12.42, date: new Date(Date.now() - 86400000 * 3).toISOString() },
  { type: 'diet', category: 'vegetarian', value: 3.0, unit: 'kg', co2e: 7.5, date: new Date(Date.now() - 86400000 * 6).toISOString() },
  { type: 'diet', category: 'vegan', value: 2.2, unit: 'kg', co2e: 3.3, date: new Date(Date.now() - 86400000 * 9).toISOString() },
  { type: 'diet', category: 'meat_beef', value: 1.5, unit: 'kg', co2e: 40.5, date: new Date(Date.now() - 86400000 * 13).toISOString() },
  { type: 'diet', category: 'vegetarian', value: 2.8, unit: 'kg', co2e: 7.0, date: new Date(Date.now() - 86400000 * 17).toISOString() },
  { type: 'diet', category: 'vegan', value: 1.9, unit: 'kg', co2e: 2.85, date: new Date(Date.now() - 86400000 * 20).toISOString() },
  { type: 'diet', category: 'meat_chicken', value: 2.0, unit: 'kg', co2e: 13.8, date: new Date(Date.now() - 86400000 * 24).toISOString() },
  { type: 'diet', category: 'vegetarian', value: 2.5, unit: 'kg', co2e: 6.25, date: new Date(Date.now() - 86400000 * 29).toISOString() },
  
  // Shopping Activities (Last 30 Days)
  { type: 'shopping', category: 'clothing', value: 3.0, unit: 'items', co2e: 30.0, date: new Date(Date.now() - 86400000 * 2).toISOString() },
  { type: 'shopping', category: 'electronics', value: 1.0, unit: 'items', co2e: 50.0, date: new Date(Date.now() - 86400000 * 5).toISOString() },
  { type: 'shopping', category: 'clothing', value: 2.0, unit: 'items', co2e: 20.0, date: new Date(Date.now() - 86400000 * 10).toISOString() },
  { type: 'shopping', category: 'electronics', value: 1.0, unit: 'items', co2e: 50.0, date: new Date(Date.now() - 86400000 * 15).toISOString() },
  { type: 'shopping', category: 'clothing', value: 1.0, unit: 'items', co2e: 10.0, date: new Date(Date.now() - 86400000 * 23).toISOString() },
  
  // Recent Activities (Today & Yesterday)
  { type: 'travel', category: 'car_petrol', value: 22.0, unit: 'km', co2e: 4.22, date: new Date().toISOString() },
  { type: 'travel', category: 'walking', value: 4.0, unit: 'km', co2e: 0, date: new Date().toISOString() },
  { type: 'energy', category: 'electricity', value: 45.0, unit: 'kWh', co2e: 36.9, date: new Date().toISOString() },
  { type: 'diet', category: 'vegetarian', value: 2.5, unit: 'kg', co2e: 6.25, date: new Date().toISOString() },
  { type: 'travel', category: 'bus', value: 15.0, unit: 'km', co2e: 1.34, date: new Date(Date.now() - 86400000).toISOString() },
];

const importData = async () => {
  try {
    await User.deleteMany();
    await Activity.deleteMany();

    const createdUser = await User.create({
      name: 'Demo User',
      email: 'demo@example.com',
      password: 'password123', // Will be hashed by pre-save hook
    });

    const demoUserId = createdUser._id;

    const activitiesWithUser = SEED_DATA.map((activity) => {
      return { ...activity, user: demoUserId };
    });

    await Activity.insertMany(activitiesWithUser);

    console.log('✅ Dataset Seeded! Login with demo@example.com / password123');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();