import { Redis } from '@upstash/redis';

// Determine if we should use the mock (local dev without keys) or actual Redis
const useMock = !process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN;

const redisClient = useMock 
  ? null 
  : new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });

// Simple in-memory fallback cache
const localCache = new Map<string, { data: any; expiry: number }>();

export const cache = {
  async get<T>(key: string): Promise<T | null> {
    if (useMock) {
      const item = localCache.get(key);
      if (!item) return null;
      if (Date.now() > item.expiry) {
        localCache.delete(key);
        return null;
      }
      return item.data as T;
    } else {
      return redisClient!.get<T>(key);
    }
  },
  async set(key: string, value: any, expirationInSeconds: number = 600): Promise<void> {
    if (useMock) {
      localCache.set(key, {
        data: value,
        expiry: Date.now() + expirationInSeconds * 1000,
      });
    } else {
      await redisClient!.setex(key, expirationInSeconds, value);
    }
  }
};
