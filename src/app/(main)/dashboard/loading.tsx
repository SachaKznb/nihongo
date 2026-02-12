export default function DashboardLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="h-8 bg-stone-200 rounded w-48 mb-8" />

        {/* Stats cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <div className="h-4 bg-stone-200 rounded w-24 mb-4" />
              <div className="h-8 bg-stone-200 rounded w-16" />
            </div>
          ))}
        </div>

        {/* Content skeleton */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
          <div className="h-6 bg-stone-200 rounded w-32 mb-6" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-stone-100 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
