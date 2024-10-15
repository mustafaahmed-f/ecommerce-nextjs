// lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // MongoDB connection string
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable
  if ((!global as any)._mongoClientPromise) {
    client = new MongoClient(uri as string, options as any);
    (!global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (!global as any)._mongoClientPromise;
} else {
  // In production mode, create a new client
  client = new MongoClient(uri as string, options as any);
  clientPromise = client.connect();
}

export default clientPromise;
