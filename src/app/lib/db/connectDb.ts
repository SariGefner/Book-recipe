import mongoose from 'mongoose';


const connectDb = async (): Promise<void> => {
   try{
    const MONGO_URI = process.env.MONGODB_URI;
    if (!MONGO_URI) {
      throw new Error('Missing MONGO_URI in environment variables');
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGO_URI);
      console.log('Connected to MongoDB');
    } else {
      console.log('Using existing MongoDB connection');
    }
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Failed to connect to database");
  }
};

export default connectDb;