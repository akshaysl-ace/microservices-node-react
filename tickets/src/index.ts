import mongoose from 'mongoose';
import { app } from './app';

// Create a start function to start server with DB connection
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('No secret found !');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('DB uri not found !');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Tickets-DB..');
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log('Tickets service started successfully..');
  });
};

start();
