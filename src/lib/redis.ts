import "server-only";
import { Redis } from "ioredis";
import { REDIS_URL } from "./env";
import { ProdInfoType } from "@/query-calls/suggestion-query";

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
  | "sidebar-categories-options"
  | "user-liking-que";

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

export async function readRedisData<T>(key: string): Promise<T> {
  const redis = getRedisClient();
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached) as T;
  } else {
    throw new Error("No data found in Redis for the given key");
  }
}

export interface UserLikingType {
  data: Array<{
    category: string;
    subcategory: string;
    priority: number;
    lastUpdated: string;
  }>;
}

export async function setUserLikingQue(key: string, userData: ProdInfoType) {
  const redis = getRedisClient();

  const preferencesKey = `${key}-preferences`;
  const existingPreferences = await redis.get(preferencesKey);

  let preferences: Array<{
    category: string;
    subcategory: string;
    priority: number;
    lastUpdated: string;
  }> = [];

  if (existingPreferences) {
    preferences = JSON.parse(existingPreferences);
  }

  // Find if an object exists by both category and subcategory
  const existingIndex = preferences.findIndex(
    (pref) =>
      pref.category === userData.category &&
      pref.subcategory === userData.subCategory
  );

  if (existingIndex >= 0) {
    // Update priority count and lastUpdated
    preferences[existingIndex].priority += 1;
    preferences[existingIndex].lastUpdated = new Date().toISOString();
  } else {
    // Add new unique object
    preferences.unshift({
      category: userData.category,
      subcategory: userData.subCategory,
      priority: 1,
      lastUpdated: new Date().toISOString(),
    });
  }

  // Ensure only unique objects by both category and subcategory
  preferences = preferences.filter(
    (pref, idx, arr) =>
      arr.findIndex(
        (p) =>
          p.category === pref.category && p.subcategory === pref.subcategory
      ) === idx
  );

  // Ensure max array length of 30
  if (preferences.length > 30) {
    preferences = preferences.slice(0, 30);
  }

  await redis.set(preferencesKey, JSON.stringify(preferences));

  // Get top preferences sorted by priority
  const topPreferences = preferences
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 1);

  return topPreferences;
}
