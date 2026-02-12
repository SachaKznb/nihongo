import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Initialize Redis client (returns null if not configured)
function createRedisClient(): Redis | null {
  let url = process.env.UPSTASH_REDIS_REST_URL;
  let token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  // Clean up URL and token in case they have extra quotes
  url = url.replace(/^["']|["']$/g, '').trim();
  token = token.replace(/^["']|["']$/g, '').trim();

  if (!url.startsWith('https://')) {
    console.warn('Upstash: Invalid URL format, skipping Redis initialization');
    return null;
  }

  try {
    return new Redis({ url, token });
  } catch (error) {
    console.error('Upstash: Failed to initialize Redis client:', error);
    return null;
  }
}

export const redis = createRedisClient();

// Rate limiters for different endpoints
// Only created if Redis is configured

// General API rate limit: 100 requests per 10 seconds per user
export const generalRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, "10 s"),
      analytics: true,
      prefix: "rl:general",
    })
  : null;

// AI generation rate limit: 10 requests per minute per user
export const aiGenerationRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "1 m"),
      analytics: true,
      prefix: "rl:ai",
    })
  : null;

// Strict rate limit for auth: 5 attempts per minute
export const authRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 m"),
      analytics: true,
      prefix: "rl:auth",
    })
  : null;

// Cache helpers
const DEFAULT_TTL = 3600; // 1 hour in seconds

export async function cacheGet<T>(key: string): Promise<T | null> {
  if (!redis) return null;
  try {
    return await redis.get<T>(key);
  } catch {
    console.error("Cache get error:", key);
    return null;
  }
}

export async function cacheSet<T>(
  key: string,
  value: T,
  ttl: number = DEFAULT_TTL
): Promise<void> {
  if (!redis) return;
  try {
    await redis.set(key, value, { ex: ttl });
  } catch {
    console.error("Cache set error:", key);
  }
}

export async function cacheDelete(key: string): Promise<void> {
  if (!redis) return;
  try {
    await redis.del(key);
  } catch {
    console.error("Cache delete error:", key);
  }
}

export async function cacheDeletePattern(pattern: string): Promise<void> {
  if (!redis) return;
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch {
    console.error("Cache delete pattern error:", pattern);
  }
}

// Helper to check rate limit and return appropriate response
export async function checkRateLimit(
  limiter: Ratelimit | null,
  identifier: string
): Promise<{ success: boolean; remaining?: number; reset?: number }> {
  if (!limiter) {
    return { success: true };
  }

  const result = await limiter.limit(identifier);
  return {
    success: result.success,
    remaining: result.remaining,
    reset: result.reset,
  };
}

// Cache key generators for consistency
export const cacheKeys = {
  userProgress: (userId: string) => `progress:${userId}`,
  levelStats: (userId: string) => `level-stats:${userId}`,
  pendingReviews: (userId: string) => `reviews:${userId}`,
  sentences: (userId: string, vocabId: number) =>
    `sentences:${userId}:${vocabId}`,
  masteredItems: (userId: string) => `mastered:${userId}`,
  dashboardData: (userId: string) => `dashboard:${userId}`,
};

// Invalidate user's cached data (call after reviews, lessons, etc.)
export async function invalidateUserCache(userId: string): Promise<void> {
  await Promise.all([
    cacheDelete(cacheKeys.userProgress(userId)),
    cacheDelete(cacheKeys.levelStats(userId)),
    cacheDelete(cacheKeys.pendingReviews(userId)),
    cacheDelete(cacheKeys.dashboardData(userId)),
  ]);
}
