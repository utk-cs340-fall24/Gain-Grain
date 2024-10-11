import { MongoClient } from 'mongodb';

const connectionString = process.env.MONGO_URI; 

if (!connectionString) {
  throw new Error('Please define the MONGO_URI environment variable inside .env');
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(connectionString);
    try {
      global._mongoClientPromise = await client.connect();
    } catch (error) {
      console.error("Error connecting to MongoDB: ", error);
      throw error;
    }
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(connectionString);
  try {
    clientPromise = await client.connect();
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    throw error;
  }
}



export default clientPromise;
