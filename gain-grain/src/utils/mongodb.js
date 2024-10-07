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
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(connectionString);
  clientPromise = client.connect();
}

export default clientPromise;
