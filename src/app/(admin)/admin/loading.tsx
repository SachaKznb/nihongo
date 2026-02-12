export default function AdminLoading() {
  return (
    <div className="p-8">
      <div className="animate-pulse">
        <div className="h-8 bg-stone-200 rounded w-48 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
              <div className="h-4 bg-stone-200 rounded w-20 mb-4" />
              <div className="h-8 bg-stone-200 rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
