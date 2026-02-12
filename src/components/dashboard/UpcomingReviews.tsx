"use client";

import { memo, useMemo } from "react";

interface UpcomingReview {
  time: Date;
  count: number;
}

interface UpcomingReviewsProps {
  reviews: UpcomingReview[];
}

export const UpcomingReviews = memo(function UpcomingReviews({ reviews }: UpcomingReviewsProps) {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = new Date(date).getTime() - now.getTime();
    const hours = Math.round(diff / (1000 * 60 * 60));

    if (hours < 1) return "< 1h";
    if (hours === 1) return "1h";
    return `${hours}h`;
  };

  // Filter to only show times with additional reviews
  let previousCount = 0;
  const filteredReviews = reviews.filter((review, index) => {
    const hasNewReviews = review.count > previousCount;
    previousCount = review.count;
    return hasNewReviews;
  });

  if (filteredReviews.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        Aucune revision a venir dans les 24 prochaines heures
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {filteredReviews.map((review, index) => (
        <div
          key={index}
          className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
        >
          <span className="text-gray-600">Dans {formatTime(review.time)}</span>
          <span className="font-semibold text-pink-600">+{review.count}</span>
        </div>
      ))}
    </div>
  );
});
