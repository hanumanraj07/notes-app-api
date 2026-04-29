const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Enable debug to see more details
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error:`, error);
    console.error(`Error name: ${error.name}`);
    console.error(`Error message: ${error.message}`);
    if (error.code) {
      console.error(`Error code: ${error.code}`);
    }
    process.exit(1);
  }
};

module.exports = connectDB;