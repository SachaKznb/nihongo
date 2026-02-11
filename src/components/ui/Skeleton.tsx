import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse bg-stone-200 rounded", className)}
      aria-hidden="true"
    />
  );
}

export function ReviewCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      <Skeleton className="h-32 w-32 mx-auto rounded-2xl mb-6" />
      <Skeleton className="h-6 w-3/4 mx-auto mb-4" />
      <Skeleton className="h-4 w-1/2 mx-auto" />
    </div>
  );
}

export function LessonCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      <Skeleton className="h-24 w-24 mx-auto rounded-2xl mb-6" />
      <Skeleton className="h-5 w-2/3 mx-auto mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-2" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-2xl" />
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <Skeleton className="h-64 rounded-3xl" />
        <Skeleton className="h-64 rounded-3xl" />
      </div>

      {/* SRS breakdown */}
      <Skeleton className="h-32 rounded-3xl" />
    </div>
  );
}

export function ProgressBarSkeleton() {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-3 w-full rounded-full" />
    </div>
  );
}

export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
      <Skeleton className="h-12 w-12 rounded-lg" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}
