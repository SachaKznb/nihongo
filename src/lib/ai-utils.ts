/**
 * AI Utility functions for handling API calls with retry logic
 * Provides exponential backoff retry for transient failures
 */

export interface RetryOptions {
  maxRetries?: number;        // default: 3
  initialDelayMs?: number;    // default: 1000
  backoffMultiplier?: number; // default: 2
  retryableErrors?: string[]; // error codes/messages to retry
}

interface ApiError extends Error {
  status?: number;
  error?: {
    type?: string;
    message?: string;
  };
}

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  initialDelayMs: 1000,
  backoffMultiplier: 2,
  retryableErrors: [
    "rate_limit_error",
    "overloaded_error",
    "api_error",
    "timeout",
    "ECONNRESET",
    "ETIMEDOUT",
    "ENOTFOUND",
  ],
};

// HTTP status codes that should trigger a retry
const RETRYABLE_STATUS_CODES = [429, 500, 502, 503, 504];

// HTTP status codes that should NOT be retried (client errors)
const NON_RETRYABLE_STATUS_CODES = [400, 401, 403, 404];

/**
 * Determines if an error is retryable based on status code and error type
 */
function isRetryableError(error: unknown, retryableErrors: string[]): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  const apiError = error as ApiError;

  // Check HTTP status code
  if (apiError.status !== undefined) {
    if (NON_RETRYABLE_STATUS_CODES.includes(apiError.status)) {
      return false;
    }
    if (RETRYABLE_STATUS_CODES.includes(apiError.status)) {
      return true;
    }
  }

  // Check error type (Anthropic SDK specific)
  if (apiError.error?.type && retryableErrors.includes(apiError.error.type)) {
    return true;
  }

  // Check error message for network errors
  const errorMessage = apiError.message?.toLowerCase() || "";
  for (const retryableError of retryableErrors) {
    if (errorMessage.includes(retryableError.toLowerCase())) {
      return true;
    }
  }

  // Check error name for network errors
  const errorName = apiError.name?.toUpperCase() || "";
  for (const retryableError of retryableErrors) {
    if (errorName.includes(retryableError.toUpperCase())) {
      return true;
    }
  }

  return false;
}

/**
 * Sleep for a specified duration
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Extracts retry delay from error headers if available (e.g., Retry-After header)
 */
function getRetryAfterMs(error: unknown): number | null {
  if (!(error instanceof Error)) {
    return null;
  }

  const apiError = error as ApiError & { headers?: Record<string, string> };

  // Check for Retry-After header (in seconds)
  const retryAfter = apiError.headers?.["retry-after"];
  if (retryAfter) {
    const seconds = parseInt(retryAfter, 10);
    if (!isNaN(seconds)) {
      return seconds * 1000;
    }
  }

  return null;
}

/**
 * Wraps an async function with retry logic and exponential backoff
 *
 * @param fn - The async function to execute
 * @param options - Retry configuration options
 * @returns The result of the function if successful
 * @throws The last error if all retries are exhausted
 *
 * @example
 * const result = await withRetry(
 *   () => anthropic.messages.create({ ... }),
 *   { maxRetries: 3, initialDelayMs: 1000 }
 * );
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options?: RetryOptions
): Promise<T> {
  const config = { ...DEFAULT_OPTIONS, ...options };
  const { maxRetries, initialDelayMs, backoffMultiplier, retryableErrors } = config;

  let lastError: unknown;
  let currentDelay = initialDelayMs;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Check if this is the last attempt
      if (attempt === maxRetries) {
        console.error(
          `[AI API] All ${maxRetries + 1} attempts failed. Giving up.`,
          { error: error instanceof Error ? error.message : error }
        );
        break;
      }

      // Check if error is retryable
      if (!isRetryableError(error, retryableErrors)) {
        console.error(
          `[AI API] Non-retryable error encountered. Not retrying.`,
          {
            error: error instanceof Error ? error.message : error,
            status: (error as ApiError)?.status,
            type: (error as ApiError)?.error?.type,
          }
        );
        break;
      }

      // Determine delay (use Retry-After header if available, otherwise exponential backoff)
      const retryAfterMs = getRetryAfterMs(error);
      const delayMs = retryAfterMs ?? currentDelay;

      console.warn(
        `[AI API] Attempt ${attempt + 1}/${maxRetries + 1} failed. Retrying in ${delayMs}ms...`,
        {
          error: error instanceof Error ? error.message : error,
          status: (error as ApiError)?.status,
          type: (error as ApiError)?.error?.type,
          nextAttempt: attempt + 2,
        }
      );

      // Wait before retrying
      await sleep(delayMs);

      // Increase delay for next attempt (exponential backoff)
      currentDelay *= backoffMultiplier;
    }
  }

  throw lastError;
}

/**
 * Pre-configured retry wrapper for AI generation calls
 * Uses sensible defaults for Claude API calls
 */
export async function withAIRetry<T>(fn: () => Promise<T>): Promise<T> {
  return withRetry(fn, {
    maxRetries: 3,
    initialDelayMs: 1000,
    backoffMultiplier: 2,
  });
}
