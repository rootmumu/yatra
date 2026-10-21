import mongoose from 'mongoose';
import { Property } from '../models/Property.js';
import { defaultProperties } from '../data/defaultProperties.js';

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/yathra';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`🍃 MongoDB Connected: ${conn.connection.host} (Database: ${conn.connection.name})`);

    // Auto-seed Atlas if Property collection is empty
    try {
      const count = await Property.countDocuments();
      if (count === 0) {
        console.log('🌱 Seeding initial properties to MongoDB Atlas...');
        await Property.insertMany(defaultProperties);
        console.log(`✅ Seeded ${defaultProperties.length} stays into MongoDB Atlas successfully!`);
      } else {
        console.log(`📊 Found ${count} stays in MongoDB Atlas.`);
      }
    } catch (seedErr) {
      console.warn('Atlas seed check note:', seedErr.message);
    }

    return true;
  } catch (error) {
    console.log(`ℹ️ MongoDB connection note: ${error.message}`);
    console.log(` Using built-in persistent JSON data store (server/data/). All operations will work seamlessly.`);
    return false;
  }
}
