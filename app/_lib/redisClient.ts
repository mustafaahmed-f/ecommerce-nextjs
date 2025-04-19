import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv(); // loads credentials from env vars
export { redis };
