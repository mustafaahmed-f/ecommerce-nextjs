// lib/db.ts
import clientPromise from "./index";
import { Db, Collection } from "mongodb";

let db: Db;

export async function getDb(): Promise<Db> {
  if (!db) {
    const client = await clientPromise;
    db = client.db("your-database-name");
  }
  return db;
}

export async function getCollection<T extends Document>(
  collectionName: string
): Promise<Collection<T>> {
  const database = await getDb();
  return database.collection<T>(collectionName);
}
