import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Cache progress data for 2 minutes, revalidate on focus
export function useProgress() {
  return useSWR("/api/progress", fetcher, {
    revalidateOnFocus: true,
    dedupingInterval: 30000, // Dedupe requests within 30 seconds
  });
}

// Cache lessons data
export function useLessons() {
  return useSWR("/api/lessons", fetcher, {
    revalidateOnFocus: true,
    dedupingInterval: 30000,
  });
}

// Cache reviews data - shorter cache since it changes frequently
export function useReviews() {
  return useSWR("/api/reviews", fetcher, {
    revalidateOnFocus: true,
    dedupingInterval: 10000, // 10 seconds for reviews
  });
}
