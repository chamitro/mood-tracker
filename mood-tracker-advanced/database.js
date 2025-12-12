const { MongoClient } = require('mongodb');

let db = null;
let client = null;

/**
 * Connect to MongoDB
 */
async function connectDB() {
  try {
    const uri = process.env.MONGODB_URI;
    
    if (!uri) {
      console.log('⚠️  No MONGODB_URI found, using in-memory storage (data will reset on restart)');
      return null;
    }

    client = new MongoClient(uri);
    await client.connect();
    db = client.db('mood-tracker');
    
    console.log('✅ Connected to MongoDB!');
    
    // Create indexes
    await db.collection('entries').createIndex({ userId: 1, date: 1 });
    await db.collection('entries').createIndex({ country: 1, date: 1 });
    
    return db;
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('⚠️  Falling back to in-memory storage');
    return null;
  }
}

/**
 * Get database instance
 */
function getDB() {
  return db;
}

/**
 * Close database connection
 */
async function closeDB() {
  if (client) {
    await client.close();
    console.log('Database connection closed');
  }
}

module.exports = { connectDB, getDB, closeDB };
