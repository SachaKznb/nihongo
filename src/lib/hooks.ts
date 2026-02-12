import useSWR from "swr";
import type { UserProgress, LessonItem, ReviewItem } from "@/types";

// Improved fetcher with error handling
const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("Erreur lors du chargement des donnees");
    // Attach extra info to the error object
    throw error;
  }

  return res.json();
};

// Retry configuration
const retryConfig = {
  onErrorRetry: (
    error: Error,
    _key: string,
    _config: unknown,
    revalidate: (opts?: { retryCount?: number }) => void,
    { retryCount }: { retryCount: number }
  ) => {
    // Don't retry on 401/403
    if (error.message.includes("401") || error.message.includes("403")) {
      return;
    }
    // Only retry up to 3 times
    if (retryCount >= 3) return;
    // Retry after 5 seconds
    setTimeout(() => revalidate({ retryCount }), 5000);
  },
};

// Hook for user progress data
export function useProgress() {
  const { data, error, isLoading, mutate } = useSWR<UserProgress>(
    "/api/progress",
    fetcher,
    {
      revalidateOnFocus: false, // Don't refetch on every tab switch
      revalidateOnReconnect: true, // But do refetch on network restore
      dedupingInterval: 60000, // 60 seconds - reduce redundant calls
      ...retryConfig,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate, // Manual revalidation trigger
  };
}

// Hook for available lessons
export function useLessons() {
  const { data, error, isLoading, mutate } = useSWR<{
    lessons: LessonItem[];
    total: number;
  }>("/api/lessons", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 60000, // 60 seconds
    ...retryConfig,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}

// Hook for pending reviews
export function useReviews() {
  const { data, error, isLoading, mutate } = useSWR<{
    reviews: ReviewItem[];
    total: number;
  }>("/api/reviews", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 30000, // 30 seconds - reviews change more often
    ...retryConfig,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}

// Utility to invalidate all caches (useful after completing lessons/reviews)
export function useInvalidateAll() {
  const { mutate: mutateProgress } = useProgress();
  const { mutate: mutateLessons } = useLessons();
  const { mutate: mutateReviews } = useReviews();

  return () => {
    mutateProgress();
    mutateLessons();
    mutateReviews();
  };
}
