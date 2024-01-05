const mongoose = require('mongoose');

// MongoDB URI should be in an environment variable to keep it secure and flexible.
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/myDatabase'; 

// Cached connection to avoid multiple connections
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectToMongoDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    try {
      cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => {
        return mongoose;
      });
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      cached.promise = null; // Reset promise on error
      throw error; // Rethrow the error for handling it in the calling function
    }
  }

  cached.conn = await cached.promise;
  console.log('Connected to MongoDB');
  return cached.conn;
};

module.exports = connectToMongoDB
