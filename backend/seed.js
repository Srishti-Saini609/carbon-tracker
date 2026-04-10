import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Activity from './models/Activity.js';
import connectDB from './config/db.js';

dotenv.config();

const generateSeedData = () => {
  const deviceId = 'demo_device';
  const data = [];
  const today = new Date();
  const daysAgo = (n) => new Date(today.getTime() - n * 86400000);

  // Travel (20)
  data.push(
    { deviceId, type: 'travel', category: 'car_petrol', value: 12.5, unit: 'km', co2e: 2.40, date: daysAgo(0) },
    { deviceId, type: 'travel', category: 'walking', value: 2.0, unit: 'km', co2e: 0, date: daysAgo(0) },
    { deviceId, type: 'travel', category: 'car_petrol', value: 15.0, unit: 'km', co2e: 2.88, date: daysAgo(1) },
    { deviceId, type: 'travel', category: 'bus', value: 8.5, unit: 'km', co2e: 0.76, date: daysAgo(2) },
    { deviceId, type: 'travel', category: 'cycling', value: 5.0, unit: 'km', co2e: 0, date: daysAgo(2) },
    { deviceId, type: 'travel', category: 'car_diesel', value: 25.0, unit: 'km', co2e: 4.28, date: daysAgo(3) },
    { deviceId, type: 'travel', category: 'train', value: 45.0, unit: 'km', co2e: 1.85, date: daysAgo(4) },
    { deviceId, type: 'travel', category: 'walking', value: 3.5, unit: 'km', co2e: 0, date: daysAgo(5) },
    { deviceId, type: 'travel', category: 'flight_domestic', value: 850.0, unit: 'km', co2e: 216.75, date: daysAgo(6) },
    { deviceId, type: 'travel', category: 'car_petrol', value: 10.0, unit: 'km', co2e: 1.92, date: daysAgo(7) },
    { deviceId, type: 'travel', category: 'bus', value: 12.0, unit: 'km', co2e: 1.07, date: daysAgo(8) },
    { deviceId, type: 'travel', category: 'cycling', value: 8.0, unit: 'km', co2e: 0, date: daysAgo(9) },
    { deviceId, type: 'travel', category: 'car_petrol', value: 20.0, unit: 'km', co2e: 3.84, date: daysAgo(10) },
    { deviceId, type: 'travel', category: 'walking', value: 1.5, unit: 'km', co2e: 0, date: daysAgo(11) },
    { deviceId, type: 'travel', category: 'car_diesel', value: 30.0, unit: 'km', co2e: 5.13, date: daysAgo(12) },
    { deviceId, type: 'travel', category: 'train', value: 60.0, unit: 'km', co2e: 2.46, date: daysAgo(13) },
    { deviceId, type: 'travel', category: 'bus', value: 15.0, unit: 'km', co2e: 1.34, date: daysAgo(14) },
    { deviceId, type: 'travel', category: 'car_petrol', value: 18.0, unit: 'km', co2e: 3.46, date: daysAgo(15) },
    { deviceId, type: 'travel', category: 'cycling', value: 6.0, unit: 'km', co2e: 0, date: daysAgo(16) },
    { deviceId, type: 'travel', category: 'walking', value: 4.0, unit: 'km', co2e: 0, date: daysAgo(17) }
  );

  // Energy (7)
  data.push(
    { deviceId, type: 'energy', category: 'electricity', value: 120.0, unit: 'kWh', co2e: 98.40, date: daysAgo(0) },
    { deviceId, type: 'energy', category: 'electricity', value: 115.0, unit: 'kWh', co2e: 94.30, date: daysAgo(7) },
    { deviceId, type: 'energy', category: 'electricity', value: 130.0, unit: 'kWh', co2e: 106.60, date: daysAgo(14) },
    { deviceId, type: 'energy', category: 'electricity', value: 125.0, unit: 'kWh', co2e: 102.50, date: daysAgo(21) },
    { deviceId, type: 'energy', category: 'lpg', value: 14.0, unit: 'kg', co2e: 21.00, date: daysAgo(0) },
    { deviceId, type: 'energy', category: 'lpg', value: 14.0, unit: 'kg', co2e: 21.00, date: daysAgo(15) },
    { deviceId, type: 'energy', category: 'natural_gas', value: 25.0, unit: 'm³', co2e: 50.00, date: daysAgo(10) }
  );

  // Diet (20)
  data.push(
    { deviceId, type: 'diet', category: 'meat_beef', value: 0.3, unit: 'kg', co2e: 8.10, date: daysAgo(0) },
    { deviceId, type: 'diet', category: 'vegetarian', value: 1, unit: 'meal', co2e: 2.50, date: daysAgo(0) },
    { deviceId, type: 'diet', category: 'meat_chicken', value: 0.4, unit: 'kg', co2e: 2.76, date: daysAgo(1) },
    { deviceId, type: 'diet', category: 'vegan', value: 1, unit: 'meal', co2e: 1.50, date: daysAgo(1) },
    { deviceId, type: 'diet', category: 'meat_beef', value: 0.5, unit: 'kg', co2e: 13.50, date: daysAgo(2) },
    { deviceId, type: 'diet', category: 'vegetarian', value: 1, unit: 'meal', co2e: 2.50, date: daysAgo(2) },
    { deviceId, type: 'diet', category: 'meat_chicken', value: 0.3, unit: 'kg', co2e: 2.07, date: daysAgo(3) },
    { deviceId, type: 'diet', category: 'vegan', value: 1, unit: 'meal', co2e: 1.50, date: daysAgo(3) },
    { deviceId, type: 'diet', category: 'vegetarian', value: 1, unit: 'meal', co2e: 2.50, date: daysAgo(4) },
    { deviceId, type: 'diet', category: 'meat_beef', value: 0.4, unit: 'kg', co2e: 10.80, date: daysAgo(5) },
    { deviceId, type: 'diet', category: 'vegan', value: 1, unit: 'meal', co2e: 1.50, date: daysAgo(5) },
    { deviceId, type: 'diet', category: 'meat_chicken', value: 0.5, unit: 'kg', co2e: 3.45, date: daysAgo(6) },
    { deviceId, type: 'diet', category: 'vegetarian', value: 1, unit: 'meal', co2e: 2.50, date: daysAgo(6) },
    { deviceId, type: 'diet', category: 'vegan', value: 1, unit: 'meal', co2e: 1.50, date: daysAgo(7) },
    { deviceId, type: 'diet', category: 'meat_beef', value: 0.6, unit: 'kg', co2e: 16.20, date: daysAgo(8) },
    { deviceId, type: 'diet', category: 'vegetarian', value: 1, unit: 'meal', co2e: 2.50, date: daysAgo(9) },
    { deviceId, type: 'diet', category: 'meat_chicken', value: 0.4, unit: 'kg', co2e: 2.76, date: daysAgo(10) },
    { deviceId, type: 'diet', category: 'vegan', value: 1, unit: 'meal', co2e: 1.50, date: daysAgo(11) },
    { deviceId, type: 'diet', category: 'meat_beef', value: 0.3, unit: 'kg', co2e: 8.10, date: daysAgo(12) },
    { deviceId, type: 'diet', category: 'vegetarian', value: 1, unit: 'meal', co2e: 2.50, date: daysAgo(13) }
  );

  // Shopping (4)
  data.push(
    { deviceId, type: 'shopping', category: 'clothing', value: 2, unit: 'items', co2e: 20.00, date: daysAgo(5) },
    { deviceId, type: 'shopping', category: 'electronics', value: 1, unit: 'items', co2e: 50.00, date: daysAgo(12) },
    { deviceId, type: 'shopping', category: 'clothing', value: 1, unit: 'items', co2e: 10.00, date: daysAgo(20) },
    { deviceId, type: 'shopping', category: 'electronics', value: 1, unit: 'items', co2e: 50.00, date: daysAgo(25) }
  );

  return data;
};

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('  Clearing old seed data...');
    await Activity.deleteMany({ deviceId: 'demo_device' });

    const seedData = generateSeedData();
    await Activity.insertMany(seedData);
    
    console.log(` Seeded ${seedData.length} activities (30 days)`);
    
    const totalCO2e = seedData.reduce((sum, a) => sum + a.co2e, 0);
    console.log(` Total CO₂e: ${totalCO2e.toFixed(2)} kg`);
    
    process.exit(0);
  } catch (err) {
    console.error(' Seed error:', err);
    process.exit(1);
  }
};

seedDatabase();