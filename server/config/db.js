const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/StarstreamDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true, // Fixes the ensureIndex deprecation warning
      useFindAndModify: false, // Optional: Fixes the findAndModify deprecation warning
    });
    console.log('MongoDB connected successfully.');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

mongoose.connection.once('open', () => {
  console.log('MongoDB connection established.');
});

module.exports = connectDB;
