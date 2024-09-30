import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({path: '.env.local' });

// Define your MongoDB connection string
const connectionString = process.env.MONGO_URI; // Ensure this is set in your environment variables

if (!connectionString) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let client;
let clientPromise;

// Check if the code is running in development mode
if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that we don’t create too many connections
  if (!global._mongoClientPromise) {
    client = new MongoClient(connectionString);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new MongoDB client
  client = new MongoClient(connectionString);
  clientPromise = client.connect();
}

export default clientPromise;
