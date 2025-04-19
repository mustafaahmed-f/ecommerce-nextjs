// import { Redis } from "@upstash/redis";

let redisClient: any = null;

export async function getRedisClient() {
  if (!redisClient) {
    const { Redis } = await import("@upstash/redis");
    redisClient = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
  return redisClient;
}

// Only initialize the Redis client when it's actually needed
export async function useRedisClient() {
  const redis = await getRedisClient();
  return redis;
}
