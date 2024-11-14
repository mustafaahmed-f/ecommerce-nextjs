// lib/redisClient.ts
import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST_LOCAL || "127.0.0.1",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  password: process.env.REDIS_PASSWORD || undefined, // Add password if set
});

export default redis;
