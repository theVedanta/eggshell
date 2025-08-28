import "server-only";
import { Redis } from "ioredis";
import { REDIS_URL } from "./env";

function getRedisUrl() {
  if (REDIS_URL) {
    return REDIS_URL;
  } else {
    throw new Error("REDIS_URL is not set");
  }
}
type redisCacheKeys =
  | "google-sheet-all-products"
  | "single-product"
  | "brands"
  | "sidebar-categories-options";

// Singleton Redis client
let redisClient: Redis | null = null;
export function getRedisClient() {
  if (!redisClient) {
    redisClient = new Redis(getRedisUrl());
  }
  return redisClient;
}

export async function getOrSetRedisCache<T>(
  key: redisCacheKeys,
  fetcher: () => Promise<T>,
  ttlSeconds = 300 // cache for 5 minutes by default
): Promise<T> {
  const redis = getRedisClient();
  const cached = await redis.get(key);
  if (cached) {
    console.log("Returning cached data");
    return JSON.parse(cached) as T;
  }
  const fresh = await fetcher();
  await redis.set(key, JSON.stringify(fresh), "EX", ttlSeconds);
  return fresh;
}

export async function reValidateGoogleSheetDataInRedis<T>(
  key: redisCacheKeys,
  fetcher: () => Promise<T>,
  ttlSeconds = 300 // cache for 5 minutes by default
): Promise<T> {
  const redis = getRedisClient();
  const fresh = await fetcher();
  await redis.set(key, JSON.stringify(fresh), "EX", ttlSeconds);
  return fresh;
}

export async function readRedisData<T>(key: redisCacheKeys): Promise<T> {
  const redis = getRedisClient();
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached) as T;
  } else {
    throw new Error("No data found in Redis for the given key");
  }
}
